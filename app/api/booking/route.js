// app/api/booking/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      fullName, email, phone, packageType, preferredDate,
      preferredTime, additionalHours, additionalNotes,
    } = body;

    if (!fullName || !email || !phone || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const basePrice = 7000;
    const additionalHourPrice = 3000;
    const totalAmount = basePrice + (additionalHours || 0) * additionalHourPrice;

    const booking = await Booking.create({
      fullName, email, phone,
      packageType: packageType || 'Seamless Backdrop Package',
      preferredDate, preferredTime,
      additionalHours: additionalHours || 0,
      additionalNotes,
      basePrice, additionalHourPrice, totalAmount,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Fail fast if SMTP creds are wrong instead of silently missing emails
    await transporter.verify();

    // Customer confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Studio Booking Request Received - Raster Media',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%); color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .booking-details { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #5DCDDB; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #666; }
            .detail-value { color: #333; }
            .total-row { background: #5DCDDB; color: white; padding: 15px; margin-top: 10px; font-size: 18px; font-weight: bold; }
            .status-badge { display: inline-block; background: #FFA500; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .button { display: inline-block; background: #5DCDDB; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎬 Raster Media</h1>
              <p>Professional Creative Studio</p>
            </div>
            
            <div class="content">
              <h2>Hi ${fullName}! 👋</h2>
              
              <p>Thank you for your interest in booking our studio! We've received your booking request and are excited to work with you.</p>
              
              <div class="status-badge">⏳ Pending - Checking Availability</div>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>We're checking the availability for your requested date and time</li>
                <li>You'll receive a confirmation email within 24 hours</li>
                <li>Once confirmed, we'll send you final booking details and payment instructions</li>
              </ul>

              <div class="booking-details">
                <h3 style="margin-top: 0; color: #5DCDDB;">📋 Your Booking Details</h3>
                
                <div class="detail-row">
                  <span class="detail-label">Package:</span>
                  <span class="detail-value">${packageType || 'Seamless Backdrop Package'}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">${new Date(preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Time:</span>
                  <span class="detail-value">${preferredTime}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Base Package:</span>
                  <span class="detail-value">LKR ${basePrice.toLocaleString()}</span>
                </div>
                
                ${additionalHours ? `
                <div class="detail-row">
                  <span class="detail-label">Additional Hours:</span>
                  <span class="detail-value">${additionalHours} hour(s) - LKR ${(additionalHours * additionalHourPrice).toLocaleString()}</span>
                </div>
                ` : ''}
                
                ${additionalNotes ? `
                <div class="detail-row">
                  <span class="detail-label">Your Notes:</span>
                  <span class="detail-value">${additionalNotes}</span>
                </div>
                ` : ''}
                
                <div class="total-row">
                  <div style="display: flex; justify-content: space-between;">
                    <span>Estimated Total:</span>
                    <span>LKR ${totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <p><strong>Contact Information:</strong><br>
              Email: ${email}<br>
              Phone: ${phone}</p>

              <p>If you need to make any changes or have questions, please reply to this email or call us directly.</p>

              <div style="text-align: center;">
                <a href="tel:+94771234567" class="button">📞 Call Us</a>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>Raster Media Creative Studio</strong><br>
              123 Main Street, Colombo, Sri Lanka<br>
              📧 rastermedia.lk@gmail.com | 📱 +94 77 123 4567</p>
              
              <p style="font-size: 12px; color: #999;">
                This is an automated confirmation. Your booking is not final until you receive a confirmation email from our team.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Admin notification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `🔔 New Studio Booking Request - ${new Date(preferredDate).toLocaleDateString()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1A1A1A; color: white; padding: 20px; }
            .alert { background: #FFA500; color: white; padding: 15px; margin: 20px 0; border-radius: 5px; text-align: center; font-weight: bold; }
            .content { background: #f9f9f9; padding: 20px; }
            .info-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #5DCDDB; }
            .action-buttons { text-align: center; margin: 30px 0; }
            .button { display: inline-block; padding: 12px 30px; margin: 5px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .confirm-btn { background: #22C55E; color: white; }
            .reject-btn { background: #EF4444; color: white; }
            .detail { padding: 8px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #666; display: inline-block; width: 150px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🔔 New Studio Booking Request</h2>
            </div>
            
            <div class="alert">
              ⚠️ ACTION REQUIRED - Review and Confirm Availability
            </div>
            
            <div class="content">
              <div class="info-box">
                <h3 style="margin-top: 0;">Customer Information</h3>
                <div class="detail">
                  <span class="label">Name:</span>
                  <span>${fullName}</span>
                </div>
                <div class="detail">
                  <span class="label">Email:</span>
                  <span><a href="mailto:${email}">${email}</a></span>
                </div>
                <div class="detail">
                  <span class="label">Phone:</span>
                  <span><a href="tel:${phone}">${phone}</a></span>
                </div>
              </div>

              <div class="info-box">
                <h3 style="margin-top: 0;">Booking Details</h3>
                <div class="detail">
                  <span class="label">Package:</span>
                  <span>${packageType || 'Seamless Backdrop Package'}</span>
                </div>
                <div class="detail">
                  <span class="label">Date:</span>
                  <span><strong>${new Date(preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong></span>
                </div>
                <div class="detail">
                  <span class="label">Time:</span>
                  <span><strong>${preferredTime}</strong></span>
                </div>
                <div class="detail">
                  <span class="label">Additional Hours:</span>
                  <span>${additionalHours || 0} hour(s)</span>
                </div>
                <div class="detail">
                  <span class="label">Total Amount:</span>
                  <span style="font-size: 18px; color: #5DCDDB;"><strong>LKR ${totalAmount.toLocaleString()}</strong></span>
                </div>
                ${additionalNotes ? `
                <div class="detail" style="border: none; padding-top: 15px;">
                  <span class="label" style="display: block; margin-bottom: 5px;">Customer Notes:</span>
                  <div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-top: 5px;">
                    ${additionalNotes}
                  </div>
                </div>
                ` : ''}
              </div>

              <div class="action-buttons">
                <p><strong>Next Steps:</strong></p>
                <ol style="text-align: left; max-width: 400px; margin: 20px auto;">
                  <li>Check studio availability for the requested date/time</li>
                  <li>Login to admin panel to confirm or reject</li>
                  <li>Customer will receive automatic notification of your decision</li>
                </ol>
                <a href="http://localhost:3000/admin/bookings" class="button confirm-btn">📅 Go to Admin Panel</a>
              </div>

              <p style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
                Booking ID: #${booking._id}<br>
                Received: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to submit booking', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const filter = status ? { status } : {};
    const bookings = await Booking.find(filter).sort({ preferredDate: 1 });

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings', details: error.message },
      { status: 500 }
    );
  }
}