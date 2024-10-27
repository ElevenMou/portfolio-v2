import { ConfirmationEmail } from "@/components/emails/confirmation-email";
import { NotificationEmail } from "@/components/emails/notification-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const formData: FormData = await request.formData();

  const email = String(formData.get("email"));
  const firstName = String(formData.get("firstname"));
  const lastName = String(formData.get("lastname"));
  const message = String(formData.get("message"));

  if (!email || !firstName || !lastName || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const contacts = await resend.contacts.list({
      audienceId: String(process.env.RESEND_AUDIENCE_ID),
    });

    const contact = contacts?.data?.data.find(
      (contact) => contact.email === email
    );

    if (!contact) {
      // Create contact
      await resend.contacts.create({
        audienceId: String(process.env.RESEND_AUDIENCE_ID),
        firstName: firstName,
        lastName: lastName,
        email: email,
        unsubscribed: false,
      });
    }

    // Wait one second before sending the confirmation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Send confirmation email
    const { data, error } = await resend.emails.send({
      from: "Moussa Saidi <contact@moussasaidi.com>",
      to: [email],
      subject: "Received your message",
      react: ConfirmationEmail({ firstName: "Moussa" }),
    });

    // Wait one second before sending the notification
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Send notification
    await resend.emails.send({
      from: "Moussa Saidi <contact@moussasaidi.com>",
      to: ["contact@moussasaidi.com"],
      subject: `New message from ${firstName} ${lastName}`,
      react: NotificationEmail({ firstName, lastName, email, message }),
    });

    // Return response
    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
