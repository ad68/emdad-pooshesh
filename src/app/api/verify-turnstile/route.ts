// app/api/verify-turnstile/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json({ success: false, message: 'توکن یافت نشد' }, { status: 400 });
        }

        // ارسال درخواست به سرور کلودفلر برای تایید توکن
        const verifyFormData = new FormData();
        verifyFormData.append('secret', process.env.CLOUDFLARE_SECRET_KEY!);
        verifyFormData.append('response', token);

        // اختیاری: برای دقت بیشتر می‌توانید IP کاربر را هم بفرستید 
        /*  const clientIp = request.headers.get('x-forwarded-for') || '';
         if (clientIp) {
             verifyFormData.append('remoteip', clientIp);
         } */

        const verifyRes = await fetch(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            {
                method: 'POST',
                body: verifyFormData,
            }
        );

        const outcome = await verifyRes.json();
        console.log("Turnstile outcome:", outcome);
        if (!outcome.success) {
            return NextResponse.json(
                { outcome: outcome },
                { success: false, message: 'کپچا نامعتبر است', errors: outcome['error-codes'] },
                { status: 403 }
            );
        }

        // در اینجا کپچا تایید شده و می‌توانید عملیات ذخیره داده / ارسال ایمیل و ... را انجام دهید
        return NextResponse.json({ success: true, message: 'تایید شد' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'خطای سرور' }, { status: 500 });
    }
}
