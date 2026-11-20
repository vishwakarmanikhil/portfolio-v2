---
title: "WhatsApp Business API explained for business owners"
description: "WhatsApp Business API lets your website send WhatsApp messages automatically: enquiry alerts, booking reminders, payment links. What it is and when you need it."
date: 2026-11-21
tags: ["WhatsApp", "Automation", "Small business"]
---

The **WhatsApp Business API** (Meta calls it the WhatsApp Business Platform) lets your **website and software send and receive WhatsApp messages automatically**: an instant reply when someone enquires, a reminder before an appointment, a payment link after a booking. It is different from the free WhatsApp Business app on your phone, and it is worth it once you are sending the same kinds of messages again and again.

I have integrated it in production for a healthcare platform used by 500+ doctors, for patient communication and notifications. This post explains what it does, in plain language.

## What is the difference between WhatsApp Business app and the API?

There are three ways a business can use WhatsApp:

- **Personal WhatsApp.** Not meant for business. No business profile, no catalogue, no automation.
- **WhatsApp Business app.** Free, on your phone. You get a business profile, quick replies, labels and simple away messages. Someone still has to type and send most messages by hand, from one phone number on a limited number of devices.
- **WhatsApp Business API.** Your software sends and receives messages through Meta's platform. No phone needs to stay switched on, many team members can work from one number through a dashboard, and messages can be triggered automatically by your website, CRM or booking system.

If you send a handful of messages a day, the free app is enough. If messages follow a pattern ("Thanks for your enquiry", "Your appointment is tomorrow", "Here is your invoice"), the API saves hours and nothing gets forgotten.

## What can a business do with it?

Some of the most useful automations:

- **Instant reply to website enquiries.** The moment someone fills in your form, they get a WhatsApp message confirming you received it.
- **Alerts to your team.** A new enquiry is sent to the right salesperson's WhatsApp immediately.
- **Appointment and booking reminders**, with the date, time and location.
- **Order, booking and payment updates**, including payment links.
- **Documents**: invoices, brochures, reports and prescriptions sent as files.
- **Two-way conversations** with customers, handled by your team from one shared number.

## What are message templates?

This is the rule that surprises most people. WhatsApp protects users from spam, so:

- When **a customer messages you**, you can reply freely for **24 hours** after their last message.
- When **you start the conversation** (a reminder, an alert, a follow-up), you must use a **message template** that Meta has approved in advance, for example: "Hi {{name}}, your appointment is on {{date}} at {{time}}."

Templates are grouped by purpose, such as utility (updates and reminders), authentication (one-time passwords) and marketing (offers). You also need the customer's **permission** before messaging them, which you can collect on your website form.

## What does it cost?

There are usually two parts:

- **Meta's charges** for the messages you send, which depend on the type of message and the country. Meta updates its pricing model from time to time, so always check [Meta's current WhatsApp pricing](https://developers.facebook.com/docs/whatsapp/pricing/) rather than an old blog post.
- **The software around it**: either a provider's dashboard with a monthly fee, or a direct integration with Meta's Cloud API built into your own website or system.

A direct integration avoids an extra monthly platform fee and fits your exact process, but needs a developer to set up and maintain.

## What do you need to get started?

1. A **Meta Business account**, ideally verified.
2. A **phone number** for the API. Traditionally this had to be a number not active on the WhatsApp apps. Meta now lets some WhatsApp Business app numbers connect to the API as well, so check the current options when you set up.
3. Your **display name** approved by Meta.
4. Your **message templates** written and approved.
5. The **integration** with your website or system, so messages are sent at the right moments.

## When is it worth it?

The API is worth it when:

- You get **enquiries or bookings every day**, and want every one answered instantly.
- Your team **sends the same messages repeatedly** and sometimes forgets.
- **Several people** need to handle conversations from one number.
- Customers **expect updates on WhatsApp** rather than email, which is common in India.

It is not worth it yet if you only send a few messages a week. The free WhatsApp Business app will do.

If you'd like WhatsApp connected to your website, enquiry system or booking process, [send me an enquiry](/freelance#enquire). And if enquiries are getting lost before anyone replies, read [how to stop losing enquiries from your website](/blog/stop-losing-website-enquiries).
