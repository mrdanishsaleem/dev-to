# Implementing Conditional Fields & Smart Email Routing in Contact Form 7

When building a contact form in WordPress using **Contact Form 7**, you may need to display different form fields based on user input. Additionally, ensuring that inquiries reach the right department without exposing email addresses on the front end is crucial.

In this article, I'll explain how I implemented conditional fields and smart email routing in Contact Form 7 to enhance form usability and security.

---

## The Challenge

I needed to create a contact form where users select an **inquiry type**, and based on their selection:

- Different form fields appear dynamically.
- The inquiry is routed to the correct department.
- Email addresses remain hidden from users to prevent spam.

For example, if a user selects _Private Credit Inquiry_, additional fields related to investment details should appear, while general inquiries should have a simple message box.

---

## The Solution: Using Conditional Fields & Smart Email Tags

To achieve this, I used the **Conditional Fields for Contact Form 7** plugin and **smart mail tags** to handle email routing efficiently.

### Step 1: Setting Up the Inquiry Type Field

The first step was to create an inquiry type dropdown field that determines what additional fields should be displayed.

```html
[select inquiry-type "Select Inquiry Type" "General Inquiry|general" "Private
Credit Inquiry|private" "Equity Investment Inquiry|equity" "Asset Sale
Inquiry|asset"]
```

🤔 How this works:

- Users see readable labels (_General Inquiry, Private Credit Inquiry, etc._).
- The form processes the hidden values (_general, private, equity, asset_).

---

### Step 2: Implementing Conditional Fields

To show different fields based on the inquiry type, I used the **Conditional Fields for Contact Form 7** plugin and wrapped the fields inside condition groups.

#### Example: Private Credit Inquiry Fields

```html
[group private-credit clear_on_hide]
<label>Investment Amount</label>
[text investment-amount]

<label>Expected Return</label>
[text expected-return] [/group]
```

#### Setting the Condition

In the **Conditional Fields tab**, I set the rule:

- **Show group “private-credit” IF [inquiry-type] = “private”**

This ensures that the investment-related fields only appear when the user selects _Private Credit Inquiry_.

Similarly, I created other field groups for Equity Investment and Asset Sale inquiries.

---

### Step 3: Configuring Smart Email Routing

Instead of exposing email addresses in the frontend, I used **smart mail tags** to dynamically assign recipient addresses based on the inquiry type.

#### **In the Mail tab, I set the recipient field as:**

```html
[inquiry-type]@example.com
```

This means:

- If the user selects _General Inquiry_, the email is sent to **general@example.com**.
- If they select _Private Credit Inquiry_, the email goes to **private@example.com**.
- If they select _Equity Investment Inquiry_, it goes to **equity@example.com**.
- If they select _Asset Sale Inquiry_, it goes to **asset@example.com**.

---

## Plugins Used

To implement these features, I used the following plugins:

1. **Contact Form 7** – [Download](https://wordpress.org/plugins/contact-form-7/)
2. **Conditional Fields for Contact Form 7** – [Download](https://wordpress.org/plugins/cf7-conditional-fields/)

These plugins together enabled me to build a dynamic, user-friendly, and secure contact form.

---

## The Results

✅ Dynamic Form Fields – Users see only the relevant fields based on their selection.

✅ No Exposed Emails – Email addresses remain hidden from the frontend.

✅ Automated Routing – Inquiries are automatically sent to the right department.

✅ Easy Maintenance – Updating email addresses or conditions doesn’t require frontend changes.

This method ensures a **secure, user-friendly, and scalable** contact form for handling multiple inquiries efficiently.

---

### Need Help Implementing This?

If you’re looking for **custom WordPress development or advanced form solutions**, feel free to reach out!
