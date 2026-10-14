import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const STAFF_PASSCODE = process.env.GATE_STAFF_PIN || 'LNJPIT@2026';

function verifyStaffAuth(pin: unknown): boolean {
  if (!pin || typeof pin !== 'string') return false;
  return pin.trim() === STAFF_PASSCODE.trim();
}

function extractRollFromBase64(token: string): string | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    if (decoded.includes('LNJPIT_ZUNOON_ATTENDANCE')) {
      const parts = decoded.split(':');
      return parts[0] ? parts[0].trim().toUpperCase() : null;
    }
  } catch {
    // not valid base64
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin, action, token } = body;

    // 1. Enforce Server-Side Staff Authentication
    if (!verifyStaffAuth(pin)) {
      return NextResponse.json(
        {
          success: false,
          error: 'UNAUTHORIZED',
          message: 'Invalid staff passcode. Scanner access restricted to authorized LNJPIT volunteers only.',
        },
        { status: 401 }
      );
    }

    // 2. Handshake / Auth verification
    if (action === 'authenticate') {
      return NextResponse.json({
        success: true,
        message: 'Staff authentication successful. Scanner unlocked.',
      });
    }

    // 3. Attendee Verification
    if (!token || typeof token !== 'string' || token.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Scan token is required.' },
        { status: 400 }
      );
    }

    const rawToken = token.trim();
    const extractedRoll = extractRollFromBase64(rawToken);

    // Supabase lookup
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          success: false,
          message: 'Database connection unconfigured on server.',
        },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Build lookup filters (sanitized)
    // Lookup by ID, QR Token, or Roll Number
    let query = supabase
      .from('zunoon_registrations')
      .select('id, full_name, roll_number, branch, batch_year, attended, attended_at, registered_at');

    if (rawToken.startsWith('ZN-2026-')) {
      query = query.eq('id', rawToken);
    } else if (extractedRoll) {
      query = query.eq('roll_number', extractedRoll);
    } else {
      query = query.or(`id.eq.${rawToken},qr_token.eq.${rawToken},roll_number.eq.${rawToken.toUpperCase()}`);
    }

    const { data: records, error: dbErr } = await query.limit(1);

    if (dbErr) {
      console.error('Database query error during scan verification:', dbErr);
      return NextResponse.json(
        { success: false, message: 'Database query error during verification.' },
        { status: 500 }
      );
    }

    // Pass not found in registered records
    if (!records || records.length === 0) {
      return NextResponse.json({
        success: true,
        valid: false,
        reason: 'NOT_FOUND',
        message: 'Unrecognized pass. No registration record exists in the LNJPIT festival database.',
        rawToken: rawToken.slice(0, 24),
      });
    }

    const record = records[0];

    // Check if already checked-in earlier
    if (record.attended) {
      return NextResponse.json({
        success: true,
        valid: false,
        reason: 'ALREADY_CHECKED_IN',
        message: `Duplicate entry detected! This pass was already scanned at ${new Date(record.attended_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}.`,
        attendee: {
          admitId: record.id,
          fullName: record.full_name,
          rollNumber: record.roll_number,
          branch: record.branch,
          attendedAt: record.attended_at,
        },
      });
    }

    // Mark pass as checked-in (attended)
    const checkinTimestamp = new Date().toISOString();
    const { error: updateErr } = await supabase
      .from('zunoon_registrations')
      .update({
        attended: true,
        attended_at: checkinTimestamp,
      })
      .eq('id', record.id);

    if (updateErr) {
      console.warn('Failed to update attendance flag:', updateErr);
    }

    // Return sanitized attendee info (exclude private phone and email)
    return NextResponse.json({
      success: true,
      valid: true,
      reason: 'VERIFIED',
      message: 'Pass verified! Admission granted.',
      attendee: {
        admitId: record.id,
        fullName: record.full_name,
        rollNumber: record.roll_number,
        branch: record.branch,
        batchYear: record.batch_year,
        attendedAt: checkinTimestamp,
      },
    });
  } catch (err: unknown) {
    console.error('Scan verification error:', err);
    return NextResponse.json(
      { success: false, message: 'Server error during scan verification.' },
      { status: 500 }
    );
  }
}
