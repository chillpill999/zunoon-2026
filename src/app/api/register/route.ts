import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Recognized LNJPIT Branches
const VALID_BRANCHES = [
  'Computer Science & Engineering (CSE)',
  'Civil Engineering (CE)',
  'Mechanical Engineering (ME)',
  'Electrical & Electronics Engineering (EEE)',
  'Food Processing & Preservation (FPP)',
  'Mathematics & Computing (M&C)',
];

function generatePassToken(roll: string, name: string): string {
  const timestamp = Date.now();
  const raw = `${roll}:${name}:${timestamp}:LNJPIT_AARAMBH_ATTENDANCE`;
  return Buffer.from(raw).toString('base64');
}

function generateAdmitId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AR-2026-${code}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, rollNumber, email, phone, branch, batchYear, interests, participateMrMsFreshers } = body;

    // Strict validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    if (!rollNumber || typeof rollNumber !== 'string' || rollNumber.trim().length < 4) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid LNJPIT Roll / Registration Number.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || '').toString().trim().replace(/[\s-]/g, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid 10-digit Indian WhatsApp mobile number.' },
        { status: 400 }
      );
    }

    if (!branch || !VALID_BRANCHES.includes(branch)) {
      return NextResponse.json(
        { success: false, message: 'Please select an authorized LNJPIT engineering department.' },
        { status: 400 }
      );
    }

    const admitId = generateAdmitId();
    const normalizedRoll = rollNumber.trim().toUpperCase();
    const qrToken = generatePassToken(normalizedRoll, fullName.trim());
    const registeredAt = new Date().toISOString();

    const attendeeRecord = {
      admitId,
      fullName: fullName.trim(),
      rollNumber: normalizedRoll,
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      branch,
      batchYear: batchYear || '1st Year / Fresher (Batch 2026)',
      interests: Array.isArray(interests) ? interests : [],
      participateMrMsFreshers: Boolean(participateMrMsFreshers),
      registeredAt,
      status: 'CONFIRMED',
      institution: 'LNJPIT Chapra',
      qrToken,
    };

    // Supabase persistence
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Check if this roll number has already been registered
        const { data: existingRows } = await supabase
          .from('zunoon_registrations')
          .select('id, full_name, roll_number, branch, batch_year, qr_token, registered_at, phone, email')
          .eq('roll_number', normalizedRoll)
          .limit(1);

        if (existingRows && existingRows.length > 0) {
          const existing = existingRows[0];
          // If phone or email matches, return existing pass
          if (existing.phone === cleanPhone || existing.email === attendeeRecord.email) {
            return NextResponse.json({
              success: true,
              message: 'Existing attendance pass retrieved for your registered roll number.',
              pass: {
                admitId: existing.id,
                fullName: existing.full_name,
                rollNumber: existing.roll_number,
                email: existing.email,
                phone: existing.phone,
                branch: existing.branch,
                batchYear: existing.batch_year,
                interests: attendeeRecord.interests,
                participateMrMsFreshers: attendeeRecord.participateMrMsFreshers,
                registeredAt: existing.registered_at,
                status: 'CONFIRMED',
                institution: 'LNJPIT Chapra',
                qrToken: existing.qr_token,
              },
            });
          } else {
            return NextResponse.json(
              {
                success: false,
                message: 'This Roll Number is already registered with a different contact. If this is an error, please contact the LNJPIT Cultural Council Helpdesk.',
              },
              { status: 409 }
            );
          }
        }

        // Insert new record into zunoon_registrations
        const { error: dbErr } = await supabase.from('zunoon_registrations').insert({
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
          attended: false,
        });

        if (dbErr) {
          console.error('Supabase registration insert error:', dbErr);
          return NextResponse.json(
            { success: false, message: 'Database connection failed. Please try again shortly.' },
            { status: 500 }
          );
        }
      } catch (dbErr) {
        console.error('Database connection error:', dbErr);
        return NextResponse.json(
          { success: false, message: 'Service temporarily unavailable. Please retry in a few moments.' },
          { status: 500 }
        );
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
