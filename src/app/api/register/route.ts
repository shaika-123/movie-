import { supabaseServer } from '@/lib/supabase';
import { generateTicketId, formatTicketDateTime } from '@/lib/ticket';
import { NextRequest, NextResponse } from 'next/server';

interface FormData {
  name: string;
  phoneNumber: string;
  age: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the data
    if (!body.name || !body.phoneNumber || !body.age) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(body.phoneNumber)) {
      return NextResponse.json(
        { error: 'Phone number must be exactly 10 digits' },
        { status: 400 }
      );
    }

    // Validate age
    const age = parseInt(body.age);
    if (isNaN(age) || age < 1 || age > 120) {
      return NextResponse.json(
        { error: 'Age must be between 1 and 120' },
        { status: 400 }
      );
    }

    // Generate unique ticket ID
    const ticketId = generateTicketId();
    
    // Get current timestamp
    const now = new Date();
    const { date, time } = formatTicketDateTime(now.toISOString());

    // Insert into Supabase
    const { data, error } = await supabaseServer
      .from('registrations')
      .insert([
        {
          name: body.name,
          phone_number: body.phoneNumber,
          age: age,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save registration' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration submitted successfully',
        ticket: {
          id: ticketId,
          name: body.name,
          age: age,
          date: date,
          time: time,
          registeredAt: now.toISOString(),
        },
        data: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing registration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all registrations
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseServer
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch registrations' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        count: data?.length || 0,
        data: data || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving registrations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
