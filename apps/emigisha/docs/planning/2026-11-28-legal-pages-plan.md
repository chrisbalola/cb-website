# Legal pages: plan and draft texts

Plan for the three pages the emigisha.com footer links to (`/terms`, `/privacy`, `/refunds`), with short draft texts to start from. Written 28 Nov 2026.

This is general information, not legal advice. The drafts are written to be short and to protect Emigisha, LLC where it matters most (liability, AI output, refunds, people in photos). Have a lawyer read the final versions once, before the payment provider reviews.

## Decisions (28 Nov 2026)

- Governing law: Delaware law and Delaware courts, with local consumer rights kept.
- Minimum age: 18.
- Liability cap: the greater of what the customer paid in the last 12 months or US$100.
- Refunds: the company page sets the default (failed generations return credits, unused credits refundable within 14 days, used credits not). Each app's own terms may set more specific rules, such as credit expiry.
- Privacy and deletion requests go to support@emigisha.com; no separate privacy@ mailbox.
- Mailing address: left out until there is one. Set `NEXT_PUBLIC_MAILING_ADDRESS` and it appears on all three pages.
- No draft banner; each page shows a "Last updated" date.

Built: `/terms`, `/privacy` (with `#delete-account`) and `/refunds` on emigisha.com. The published pages are now the source of truth; the drafts in section 6 are kept as the starting point. The privacy policy leaves out "our AI providers do not train on your data" until that is confirmed for fal.ai and Anthropic (section 8).

## 1. What exists today

| Product                 | Terms                                   | Privacy                        | Refunds                    | Problems                                                                                                                                                                                                                                                                                                                    |
| ----------------------- | --------------------------------------- | ------------------------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Meneja (meneja-website) | Long, 14 sections                       | Long, 12 sections              | None (free)                | Names **"Emigisha Ltd"** and **Kenyan law and Nairobi courts**, but the company is Emigisha, LLC in Delaware. Contact is `support@meneja.com`. Claims "regular security audits" and "encrypted at rest", which need to be true. Does not name its processors (Anthropic for AI reading, per the transaction capture notes). |
| Talatala                | One rule: only add people who consented | None                           | None                       | Takes payments by card and mobile money with no privacy or refund policy.                                                                                                                                                                                                                                                   |
| PrettyCV                | Copy of Talatala's                      | None                           | None                       | The text talks about "photos" and "people in your photos": it was copied from Talatala and never adapted.                                                                                                                                                                                                                   |
| StyledDoc               | Short, plain, 11 sections               | Short, plain, lists processors | Inside the terms (credits) | Marked "Draft. Not yet reviewed by a lawyer". Governing law "to be confirmed".                                                                                                                                                                                                                                              |
| emigisha.com            | Footer links only                       | Footer links only              | Footer links only          | All three pages return "not found".                                                                                                                                                                                                                                                                                         |

StyledDoc's draft is the best model: plain language, names every processor, says what is and is not stored. The drafts below follow its tone.

## 2. Where the texts come from

Researched sources, from most to least useful for this case:

1. **Our own StyledDoc draft.** Already plain-language and accurate for one product. Reusing it needs no attribution.
2. **Basecamp policies** ([github.com/basecamp/policies](https://github.com/basecamp/policies)), CC BY 4.0. Short, readable terms, privacy and refund texts from a real SaaS company. Free to adapt with one attribution line ("Adapted from the Basecamp open-source policies / CC BY 4.0"). The repo is archived, so treat it as wording to borrow, not as current law.
3. **Automattic Legalmattic** (WordPress.com terms), CC BY-SA 4.0. Good wording, but share-alike would require publishing our adapted pages under the same license. Not worth it.
4. **Common Paper** ([commonpaper.com/standards](https://commonpaper.com/standards/)), CC BY 4.0. Lawyer-drafted, but built for business-to-business contracts (cloud service agreement, DPA). Useful later if a business customer asks for a DPA; too heavy for consumer pages.
5. **Generators** (Termly, iubenda, TermsFeed). Fast, but long, generic, often paid to host, and they do not know our products. Not recommended.

The drafts below are written fresh from 1 and 2, so they need no attribution unless whole Basecamp passages are pasted in later.

## 3. What reviewers and stores check

- **Stripe** ([website checklist](https://docs.stripe.com/get-started/checklist/website)): a terms page, a privacy policy, and a refund policy that says when a customer gets a refund (some countries also want the timeline). A site that is incomplete or under construction blocks activation.
- **pawaPay, Mercury, Flutterwave** (from our own `website.md`): legal name matching the formation documents, a working contact email on the company domain, and terms, privacy and refund policies published, with no placeholder text.
- **Google Play** ([account deletion](https://support.google.com/googleplay/android-developer/answer/13327111)): a public privacy policy URL (not a PDF), and a web link where users can ask for account and data deletion. A clearly marked section of the privacy policy counts. Apple asks for a privacy policy URL too.
- **EU customers**: a 14-day right of withdrawal applies to online purchases. For digital content such as credits, it can be waived only if the customer ticks an explicit consent and acknowledgement before the content is delivered, and gets a confirmation by email ([Consumer Rights Directive, art. 16(m)](https://www.legislation.gov.uk/eudr/2011/83/chapter/III)). Courts read this strictly, so it has to be a separate checkbox at checkout, not a line in the terms.
- **East African data laws** (from Meneja's legal notes): Kenya, Uganda, Tanzania, Rwanda and Nigeria each have a data protection act. Common ground: a privacy policy that names processors and what each gets, and in several countries registration with the regulator above a size threshold.

## 4. Structure

One set of company pages on emigisha.com covers every app Emigisha runs (Talatala, PrettyCV, StyledDoc and later ones). Each product links to them and adds only what is specific to it:

- `/terms`: company terms. Product sites add short product rules (Talatala's consent rule, StyledDoc's credit rules) and link back.
- `/privacy`: one policy with a per-product processor table, and a `#delete-account` section for Google Play.
- `/refunds`: one policy for every paid product.
- Meneja keeps its own pages, but fixes the company name and governing law to match (see section 7).

Why one set: one place to keep current, one legal name and one law, and every product passes a payment review by linking to the same pages.

## 5. Decisions needed from you

| Decision                 | Recommendation                                                                                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Governing law and courts | **Delaware law, Delaware courts**, plus "your local consumer rights still apply". It matches the entity. No arbitration clause: it adds cost and complexity a one-person company does not need.                     |
| Minimum age              | **18**, since every product takes payments. Simpler than handling parental consent.                                                                                                                                 |
| Refund rule for credits  | **Unused credits refundable within 14 days of purchase; used credits not, except where the law requires; failed generations always returned.** Generous enough to avoid chargebacks, which cost more than a refund. |
| Liability cap            | **The greater of what you paid us in the last 12 months or US$50.**                                                                                                                                                 |
| Mailing address          | Still an open item in `website.md`. Stripe and pawaPay will ask for it; the terms should show it once you have one.                                                                                                 |
| Lawyer review            | One flat-fee review of the three final texts.                                                                                                                                                                       |

## 6. Draft texts

Placeholders are in square brackets.

### Terms of Service

> **Terms of Service**
> Last updated: [date]
>
> **Who we are.** Emigisha, LLC ("Emigisha", "we") is a Delaware limited liability company. These terms cover emigisha.com and the apps we run: Talatala, PrettyCV, StyledDoc and any app that links to these terms. An app may add its own rules on its site; for that app, those rules apply on top of these.
>
> **Your account.** You must be 18 or older. Give accurate details, keep your password safe, and tell us if someone else gets into your account. You are responsible for what happens in it.
>
> **Your content.** What you upload stays yours. You let us store and process it only to run the app for you. Only upload content you have the right to use. If it shows another person, you must have their explicit consent.
>
> **What you may not do.** Break the law; upload content that is not yours or that harms someone; impersonate anyone or make misleading images of real people; try to break, overload or get around the security of our apps; scrape or resell them.
>
> **AI results.** Our apps use AI. Results can be wrong or unexpected. Check them before you rely on them or share them, especially CVs, documents and photos of people.
>
> **Payments.** Prices are shown before you pay, in the currency shown at checkout. We take card payments through Stripe and mobile money through pawaPay. Credits expire as each app states. Refunds follow our Refund Policy.
>
> **Changes and availability.** We improve our apps often, and may change or stop a feature or an app. If we stop a paid app, we refund unused credits. We do our best to keep things running, but the apps are provided "as is", without warranties.
>
> **Liability.** We are not liable for indirect or consequential losses, such as lost profits or data. Our total liability is limited to the greater of what you paid us in the 12 months before the claim or US$50. Nothing in these terms limits liability that the law does not allow us to limit.
>
> **Ending.** You can stop using an app and delete your account at any time. We may suspend or close an account that breaks these terms.
>
> **Changes to these terms.** If we make an important change, we tell you by email or in the app before it applies.
>
> **Law.** These terms are governed by the laws of the State of Delaware, and disputes go to the courts of Delaware. This does not take away any consumer protection the law of your country gives you.
>
> **Contact.** legal@emigisha.com · [mailing address]

### Privacy Policy

> **Privacy Policy**
> Last updated: [date]
>
> Emigisha, LLC runs Talatala, PrettyCV, StyledDoc and the other apps that link here. This policy explains what we collect, why, who helps us, and how to delete it.
>
> **What we collect.**
>
> - Account details: name, email, phone number if you give it.
> - What you put in the app: photos, CV details, documents, and the results we make from them.
> - Payment records: amount, date and status. We never see your card number; Stripe and pawaPay handle payment details.
> - Support messages, and basic technical logs (device, browser, IP address) for security.
>
> **Why.** To run the app you use, take payments, keep accounts secure, answer support, and meet legal and tax duties. We do not sell your data and do not use it for ads.
>
> **Who helps us.** Each only gets what its job needs:
>
> | Service    | Job                                                                  | Apps                                      |
> | ---------- | -------------------------------------------------------------------- | ----------------------------------------- |
> | Railway    | Hosting the apps and databases                                       | All                                       |
> | Cloudflare | Storing files (R2), bot checks (Turnstile), cookie-free visit counts | All                                       |
> | Stripe     | Card payments                                                        | All paid apps                             |
> | pawaPay    | Mobile money payments                                                | Talatala, PrettyCV [once it launches]     |
> | ZeptoMail  | Sending emails                                                       | All                                       |
> | fal.ai     | Generating photos from your selfies                                  | Talatala                                  |
> | Anthropic  | Answering chat messages                                              | StyledDoc, PrettyCV [once its chat ships] |
>
> These services may process data in the United States and other countries. Our AI providers do not train their models on your data.
>
> **How long we keep it.** While your account is open. Payment records as long as tax rules require. Logs for a short time. When you delete your account, we delete your content and personal data within [30] days, except what the law makes us keep.
>
> **Delete your account** (`#delete-account`). Use Delete account in the app's settings, or email privacy@emigisha.com from the address on your account, naming the app.
>
> **Your rights.** You can ask to see, correct, export or delete your data, or object to how we use it. Write to us and we reply within 30 days. You can also complain to your country's data protection authority.
>
> **Children.** Our apps are not for anyone under 18.
>
> **Cookies.** Only the cookies needed to keep you signed in. Our visit counts do not use cookies.
>
> **Changes.** If we change this policy in an important way, we tell you by email or in the app.
>
> **Contact.** privacy@emigisha.com · Emigisha, LLC · [mailing address]

### Refund Policy

> **Refund Policy**
> Last updated: [date]
>
> **If something fails.** If an app fails to make what you paid for (a photo, a CV, a PDF), the credits go back to your balance automatically. If they do not, write to us and we fix it.
>
> **Unused credits.** You can get your money back for credits you have not used, within 14 days of buying them.
>
> **Used credits.** Credits you have used are not refundable, except where the law requires it.
>
> **How to ask.** Email support@emigisha.com from the address on your account, with the app name and the date of the payment.
>
> **How you are paid back.** To the same card or mobile money number you paid with, within [10] business days of our approval. Your bank or mobile money provider may take a few more days.
>
> **Chargebacks.** Please write to us before disputing a payment with your bank. We answer quickly, and a dispute can freeze your account while it is reviewed.

## 7. Implementation plan

1. **Decide** the points in section 5 and fill the placeholders.
2. **Pages on emigisha.com** (this repo, done): a `legal` feature with `terms`, `privacy` and `refunds` pages under `src/features/legal/presentation/pages/`, routes in `src/app/[locale]/`, text in `src/features/legal/presentation/i18n/en.json`. Simple reading layout in the site's style (navy header band, one text column). "Last updated" date on each page. Add the new `privacy@` address to the config and footer.
3. **Checkout consent in each paid product**: an EU-safe checkbox before credits are delivered ("I want my credits now and understand I lose my 14-day right to cancel once I use them"), and the same line in the receipt email.
4. **Products link to the company pages**: Talatala, PrettyCV and StyledDoc footers and sign-up screens link to emigisha.com/terms, /privacy and /refunds. Keep only product-specific rules on the product sites (Talatala's consent rule; StyledDoc's credit expiry).
5. **Fix the product texts**:
   - PrettyCV: replace the copied Talatala "photos" terms.
   - StyledDoc: set the governing law to Delaware and remove the draft banner once reviewed.
   - Meneja: change "Emigisha Ltd" to "Emigisha, LLC", align the governing law, name Anthropic as a processor, and remove claims that are not true today ("regular security audits").
6. **Payment providers and stores**: give the three URLs to Stripe and pawaPay; set the privacy URL and the `#delete-account` link in Google Play and App Store Connect.
7. **Lawyer review** of the final texts, then remove any "draft" wording.
8. **Keep current**: update the processor table and "Last updated" whenever a product adds a service (an item for every product launch checklist).

## 8. To verify before publishing

- PrettyCV's real processors: its backend is still a copy of Talatala's, so the table rows for it are what is planned, not what runs.
- That fal.ai, Anthropic and Google (if Gemini models are used through fal.ai) do not train on our data under our current plans, so the privacy line stays true.
- That account deletion in each app deletes content within the stated number of days.
- Which mobile money countries pawaPay covers for each app, and the real refund timelines for card and mobile money.
- Whether any data protection authority (Kenya, Uganda, Rwanda, Nigeria) requires registration at our current size.
