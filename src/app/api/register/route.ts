import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Fallback in-memory / crypto generator for attendance pass
function generatePassToken(roll: string, name: string): string {
  const timestamp = Date.now();
  const raw = `${roll}:${name}:${timestamp}:LNJPIT_ZUNOON_ATTENDANCE`;
  return Buffer.from(raw).toString('base64');
}

function generateAdmitId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ZN-2026-${code}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, rollNumber, email, phone, branch, batchYear, interests, participateMrMsFreshers } = body;

    // Validation
    if (!fullName || !rollNumber || !email || !phone || !branch) {
      return NextResponse.json(
        { success: false, message: 'All required fields (Full Name, Roll No, Email, Phone, Branch) must be provided.' },
        { status: 400 }
      );
    }

    const admitId = generateAdmitId();
    const qrToken = generatePassToken(rollNumber, fullName);
    const registeredAt = new Date().toISOString();

    const attendeeRecord = {
      admitId,
      fullName: fullName.trim(),
      rollNumber: rollNumber.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      branch,
      batchYear: batchYear || '1st Year (2026-2030)',
      interests: interests || [],
      participateMrMsFreshers: Boolean(participateMrMsFreshers),
      registeredAt,
      status: 'CONFIRMED',
      institution: 'LNJPIT Chapra',
      qrToken,
    };

    // Attempt to persist to Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Persist directly to Supabase zunoon_registrations table
        const { error: dbErr } = await supabase.from('zunoon_registrations').upsert(
          {
            id: admitId,
            full_name: attendeeRecord.fullName,
            roll_number: attendeeRecord.rollNumber,
            email: attendeeRecord.email,
            phone: attendeeRecord.phone,
            branch: attendeeRecord.branch,
            batch_year: attendeeRecord.batchYear,
            interests: attendeeRecord.interests,
            mr_ms_freshers: attendeeRecord.participateMrMsFreshers,
            status: 'CONFIRMED',
            institution: attendeeRecord.institution,
            qr_token: qrToken,
            registered_at: registeredAt,
          },
          { onConflict: 'id' }
        );

        if (dbErr) {
          console.warn('Supabase sync warning (pass remains valid):', dbErr);
        }
      } catch (dbErr) {
        console.warn('Supabase sync warning (pass remains valid):', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Your digital attendance pass is ready.',
      pass: attendeeRecord,
    });
  } catch (err: unknown) {
    console.error('Registration processing error:', err);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred while processing registration.' },
      { status: 500 }
    );
  }
}
