import { Link } from "@mui/material";
import classes from "./style.module.scss";
import { ListInfo } from "./styledComponents";

const termAndUseRules = [
  "upload, post, transmit or otherwise make available any Content that is unlawful, harmful, threatening, abusive, harassing, alarming, distressing, tortuous, defamatory, vulgar, obscene, libellous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable;",
  "violate any laws, including without limitation any laws and regulation in relation to export and import restrictions, third party rights or our Prohibited and Restricted Items policy;",
  "upload, post, transmit or otherwise make available any Content featuring an unsupervised minor or use the Services to harm minors in any way;",
  "use the Services or upload Content to impersonate any person or entity, or otherwise misrepresent your affiliation with a person or entity;",
  "forge headers or otherwise manipulate identifiers in order to disguise the origin of any Content transmitted through the Services;",
  "remove any proprietary notices from the Site;",
  "cause, permit or authorize the modification, creation of derivative works, or translation of the Services without the express permission of Smart Apes;",
  "use the Services for the benefit of any third party or any manner not permitted by the licenses granted herein;",
  "use the Services or upload Content in a manner that is fraudulent, unconscionable, false, misleading or deceptive;",
  "open and/or operate multiple user accounts in connection with any conduct that violates either the letter or spirit of these Terms of Service;",
  "access the Smart Apes platform, open a user account, or otherwise access your user account using any non-official Smart Apes hardware or software, including but not limited to an emulator, simulator, bot or other similar hardware or software;",
  "manipulate the price of any item or interfere with other User's listings;",
  "take any action that may undermine the feedback or ratings systems;",
  "attempt to decompile, reverse engineer, disassemble or hack the Services (or any portion thereof), or to defeat or overcome any encryption technology or security measures implemented by Smart Apes with respect to the Services and/or data transmitted, processed or stored by Smart Apes;",
  "harvest or collect any information about or regarding other Account holders, including, without limitation, any personal data or information;",
  "upload, email, post, transmit or otherwise make available any Content that you do not have a right to make available under any law or under contractual or fiduciary relationships (such as inside information, proprietary and confidential information learned or disclosed as part of employment relationships or under nondisclosure agreements);",
  "upload, email, post, transmit or otherwise make available any Content that infringes any patent, trademark, trade secret, copyright or other proprietary rights of any party;",
  `upload, email, post, transmit or otherwise make available any unsolicited or unauthorised advertising, promotional materials, "junk mail", "spam", "chain letters", "pyramid schemes", or any other unauthorised form of solicitation;`,
  "upload, email, post, transmit or otherwise make available any material that contains software viruses, worms, Trojan-horses or any other computer code, routines, files or programs designed to directly or indirectly interfere with, manipulate, interrupt, destroy or limit the functionality or integrity of any computer software or hardware or data or telecommunications equipment;",
  `disrupt the normal flow of dialogue, cause a screen to "scroll" faster than other Users of the Services are able to type, or otherwise act in a manner that negatively affects other Users' ability to engage in real time exchanges; `,
  "interfere with, manipulate or disrupt the Services or servers or networks connected to the Services or any other User's use and enjoyment of the Services, or disobey any requirements, procedures, policies or regulations of networks connected to the Site; ",
  "take any action or engage in any conduct that could directly or indirectly damage, disable, overburden, or impair the Services or the servers or networks connected to the Services;",
  "use the Services to intentionally or unintentionally violate any applicable local, state, national or international law, rule, code, directive, guideline, policy or regulation including, without limitation, laws and requirements (whether or not having the force of law) relating to anti-money laundering or counter-terrorism;",
  `use the Services in violation of or to circumvent any sanctions or embargo administered or enforced by the U.S. Department of Treasury’s Office of Foreign Assets Control, the United Nations Security Council, the European Union or Her Majesty’s Treasury; `,
  `use the Services to violate the privacy of others or to "stalk" or otherwise harass another;`,
  "infringe the rights of Smart Apes, including any intellectual property rights and any passing off of the same thereof;",
  "use the Services to collect or store personal data about other Users in connection with the prohibited conduct and activities set forth above;",
  "list items which infringe upon the copyright, trademark or other intellectual property rights of third parties or use the Services in a manner which will infringe the intellectual property rights of others; and/or",
  "direct or encourage another user to conduct a transaction other than on the Site.",
];

const violationTerms = [
  "Listing deletion",
  "Limits placed on Account privileges",
  "Account suspension and subsequent termination",
  "Criminal charges",
  "Civil actions, including without limitation a claim for damages and/or interim or injunctive relief",
];

const guaranteeTerms = [
  "Buyer sends confirmation to Smart Apes that Buyer has received his/her goods, in which case, unless 11.2(d) applies, Smart Apes will release Buyer’s Purchase Monies (less the Seller’s proportion of the Shipping Fee (if applicable), the Transaction Fee and Tax Amount (defined below), and (if applicable) the Cross Border Fee (defined below)) in Smart Apes Guarantee Account to Seller;",
  "Smart Apes Guarantee Period (or any approved extension under 11.3) expires, in which case, unless 11.2(c) or 11.2(d) applies, Smart Apes will release Buyer’s Purchase Monies (less  the Seller’s proportion of the Shipping Fee (if applicable), the Transaction Fee and Tax Amount (defined below), and (if applicable) the Cross Border Fee (defined below)) in Smart Apes Guarantee Account to Seller;",
  "Smart Apes determines that Buyer’s application for a return of goods and/or refund is successful, in which case, unless 12.2(d) applies, Smart Apes will provide a refund to Buyer, subject to and in accordance with the Refunds and Return Policy;",
  `such other time as Smart Apes reasonably determines that a distribution of Buyer’s Purchase Monies (less the Seller’s proportion of the Shipping Fee (if applicable), the Transaction Fee and Tax Amount (defined below), and (if applicable) the Cross Border Fee (defined below)) is appropriate, including, without limitation, where it deems reasonably necessary to comply with applicable law or a court order or to enforce these Terms of Service.
  Smart Apes Guarantee is only offered to Buyers who have made payment through the channels provided by Smart Apes into Smart Apes Guarantee Account. Offline arrangements between Buyer and Seller will not be covered under Smart Apes Guarantee.
  `,
];

const feedbackTerms = [
  "Feedback may be made in writing through email to or using the feedback form found on the App.",
  "Anonymous feedback will not be accepted.",
  "Users affected by the feedback should be fully informed of all facts and given the opportunity to put forward their case.",
  "Vague and defamatory feedback will not be entertained.",
];

const limitationsTerms = [
  "(a) loss of use; (b) loss of profits; (c) loss of revenues; (d) loss of data; (e) loss of good will; or (f) failure to realise anticipated savings, in each case whether direct or indirect; or",
  "any indirect, incidental, special or consequential damages, arising out of or in connection with the use or inability to use this site or the services, including, without limitation, any damages resulting therefrom, even if Smart Apes has been advised of the possibility of such damages.",
];

export const termOfServices = [
  {
    title: "INTRODUCTION",
    list: [
      `Welcome to the Smart Apes platform (the "Site"). Please read the following Terms of Service carefully before using this Site or opening a Smart Apes account ("Account") so that you are aware of your legal rights and obligations with respect to Smart Apes and its Affiliates and subsidiaries (individually and collectively, "Smart Apes", "we", "us" or "our"). For the purposes of these Services Term, “Affiliates” means, with respect to an entity, any entity that Controls, is Controlled by, or is under common Control with, that entity, where "Control" means the possession, directly or indirectly, of the power to direct or cause the direction of the management, operating policies, or assets of that entity, whether by way of ownership of more than 50% of its voting or equity securities or assets, or by way of contract, management agreement, voting trust, or otherwise; provided that the term "Affiliates" shall include any variable interest entity regardless of whether any variable interest entity may be, or required to be, consolidated with that entity under generally accepted accounting principles. The "Services" we provide or make available include (a) the Site, (b) the services provided by the Site and by Smart Apes client software made available through the Site, and (c) all information, linked pages, features, data, text, images, photographs, graphics, music, sounds, video (including live streams), messages, tags, content, programming, software, application services (including, without limitation, any mobile application services) or other materials made available through the Site or its related services ("Content"). Any new features added to or augmenting the Services are also subject to these Service Terms. These Service Terms govern your use of Services provided by Smart Apes.`,
      "The Services include an online platform service that provides a place and opportunity for the sale of goods between the buyer (“Buyer”) and the seller (“Seller”) (collectively “you”, “Users” or “Parties”). The actual contract for sale is directly between Buyer and Seller and Smart Apes is not a party to that or any other contract between Buyer and Seller and accepts no obligations in connection with any such contract. Parties to such transaction will be entirely responsible for the sales contract between them, the listing of goods, warranty of purchase and the like. Smart Apes is not involved in the transaction between Users. Smart Apes may or may not pre-screen Users or the Content or information provided by Users. Smart Apes reserves the right to remove any Content or information posted by you on the Site in accordance to Section 6.4 herein. Smart Apes cannot ensure that Users will actually complete a transaction.",
      "Before becoming a User of the Site, you must read and accept all of the terms and conditions in, and linked to, these Service Terms and you must consent to the processing of your personal data as described in the Privacy Policy linked hereto.",
      "Smart Apes reserves the right to change, modify, suspend or discontinue all or any part of this Site or the Services at any time or upon notice as required by local laws. Smart Apes may release certain Services or their features in a beta version, which may not work correctly or in the same way the final version may work, and we shall not be held liable in such instances. Smart Apes may also impose limits on certain features or restrict your access to parts of, or the entire, Site or Services in its sole discretion and without notice or liability.",
      `Smart Apes reserves the right to refuse to provide you access to the Site or Services or to allow you to open an Account for any reason. By using Smart Apes services or opening an account, you give your irrevocable acceptance of and consent to the terms of this agreement, including those additional terms and conditions and policies referenced herein and/or linked hereto. If you do not agree to these terms, please do not use our services or access the site. If you are under the age of 18 or the legal age for giving consent hereunder pursuant to the applicable laws in your country (the “legal age”), you must get permission from a parent or legal guardian to open an account and that parent or legal guardian must agree to the terms of this agreement. If you do not know whether you have reached the legal age, or do not understand this section, please do not create an account until you have asked your parent or legal guardian for help. If you are the parent or legal guardian of a minor who is creating an account, you must accept the terms of this agreement on the minor's behalf and you will be responsible for all use of the account or company services using such account, whether such account is currently open or created later.`,
    ],
    italicAdditionalInfo: true,
    additionalInfo:
      "By using Smart Apes services or opening an account, you give your irrevocable acceptance of and consent to the terms of this agreement, including those additional terms and conditions and policies referenced herein and/or linked hereto.  If you do not agree to these terms, please do not use our services or access the site. If you are under the age of 18 or the legal age for giving consent hereunder pursuant to the applicable laws in your country (the “legal age”), you must get permission from a parent or legal guardian to open an account and that parent or legal guardian must agree to the terms of this agreement. If you do not know whether you have reached the legal age, or do not understand this section, please do not create an account until you have asked your parent or legal guardian for help. If you are the parent or legal guardian of a minor who is creating an account, you must accept the terms of this agreement on the minor's behalf and you will be responsible for all use of the account or company services using such account, whether such account is currently open or created later.",
  },
  {
    title: "PRIVACY",
    list: [
      "Your privacy is very important to us at Smart Apes. To better protect your rights, we have provided the Smart Apes Privacy Policy to explain our privacy practices in detail. Please review the Privacy Policy to understand how Smart Apes collects and uses the information associated with your Account and/or your use of the Services (the “User Information”). By using the Services or providing information on the Site, you: (i) consent to Smart Ape's collection, use, disclosure and/or processing of your Content, personal data and User Information as described in the Privacy Policy; (ii) agree and acknowledge that the proprietary rights of your User Information are jointly owned by you and Smart Apes; and (iii) shall not, whether directly or indirectly, disclose your User Information to any third party, or otherwise allow any third party to access or use your User Information, without Smart Ape’s prior written consent.",
      "Users in possession of another User’s personal data through the use of the Services (the “Receiving Party”) hereby agree that, they will (i) comply with all applicable personal data protection laws with respect to any such data; (ii) allow the User whose personal data the Receiving Party has collected (the “Disclosing Party”) to remove his or her data so collected from the Receiving Party’s database; and (iii) allow the Disclosing Party to review what information have been collected about them by the Receiving Party, in each case of (ii) and (iii) above, in compliance with and where required by applicable laws.",
    ],
  },
  {
    title: "LIMITED LICENSE",
    list: [
      "Smart Apes grants you a limited and revocable license to access and use the Services subject to the terms and conditions of these Service Terms. All proprietary Content, trademarks, service marks, brand names, logos and other intellectual property (“Intellectual Property”) displayed in the Site are the property of Smart Apes and where applicable, third party proprietors identified in the Site. No right or licence is granted directly or indirectly to any party accessing the Site to use or reproduce any Intellectual Property, and no party accessing the Site shall claim any right, title or interest therein. By using or accessing the Services you agree to comply with the copyright, trademark, service mark, and all other applicable laws that protect the Services, the Site and its Content. You agree not to copy, distribute, republish, transmit, publicly display, publicly perform, modify, adapt, rent, sell, or create derivative works of any portion of the Services, the Site or its Content. You also may not, without our prior written consent, mirror or frame any part or whole of the contents of this Site on any other server or as part of any other website. In addition, you agree that you will not use any robot, spider or any other automatic device or manual process to monitor or copy our Content, without our prior written consent (such consent is deemed given for standard search engine technology employed by Internet search websites to direct Internet users to this website).",
      "You are welcome to link to the Site from your website, provided that your website does not imply any endorsement by or association with Smart Apes. You acknowledge that Smart Apes may, in its sole discretion and at any time, discontinue providing the Services, either in part or as a whole, without notice.",
    ],
  },
  {
    title: "SOFTWARE",
    list: [
      "Any software provided by us to you as part of the Services is subject to the provisions of these Service Terms. Smart Apes reserves all rights to the software not expressly granted by Smart Apes hereunder. Any third-party scripts or code, linked to or referenced from the Services, are licensed to you by the third parties that own such scripts or code, not by Smart Apes.",
    ],
  },
  {
    title: "ACCOUNT AND SECURITY",
    list: [
      `Some functions of our Services require registration for an Account by selecting a unique user identification ("User ID") and password, and by providing certain personal information. If you select a User ID that Smart Apes, in its sole discretion, finds offensive or inappropriate, Smart Apes has the right to suspend or terminate your Account. You may be able to use your Account to gain access to other products, websites or services to which we have enabled access or with which we have tied up or collaborated. Smart Apes has not reviewed, and assumes no responsibility for any third party content, functionality, security, services, privacy policies, or other practices of those products, websites or services. If you do so, the terms of service for those products, websites or services, including their respective privacy policies, if different from these Service Terms and/or our Privacy Policy, may also apply to your use of those products, websites or services.`,
      "You agree to (a) keep your password confidential and use only your User ID and password when logging in, (b) ensure that you log out from your account at the end of each session on the Site, (c) immediately notify Smart Apes of any unauthorised use of your Account, User ID and/or password, and (d) ensure that your Account information is accurate and up-to-date. You are fully responsible for all activities that occur under your User ID and Account even if such activities or uses were not committed by you. Smart Apes will not be liable for any loss or damage arising from unauthorised use of your password or your failure to comply with this Section.",
      "You agree that Smart Apes may for any reason, in its sole discretion and with or without notice or liability to you or any third party, immediately terminate your Account and your User ID, remove or discard from the Site any Content associated with your Account and User ID, withdraw any subsidies offered to you, cancel any transactions associated with your Account and User ID, temporarily or in more serious cases permanently withhold any sale proceeds or refunds, and/or take any other actions that Smart Apes deems necessary. Grounds for such actions may include, but are not limited to, actual or suspected (a) extended periods of inactivity, (b) violation of the letter or spirit of these Service Terms, (c) illegal, fraudulent, harassing, defamatory, threatening or abusive behaviour (d) having multiple user accounts, (e) buying products on the Site for the purpose of commercial re-sale, (f) abnormal or excessive purchasing of products from the same Seller or related group of Sellers, (g) voucher abuse (including, but not limited to, selling of vouchers to third parties, selling of vouchers or other credits at a significant mark-up above face value, and/or abnormal or excessive use of vouchers on the Site), or (h) behaviour that is harmful to other Users, third parties, or the business interests of Smart Apes. Use of an Account for illegal, fraudulent, harassing, defamatory, threatening or abusive purposes may be referred to law enforcement authorities without notice to you. If a legal dispute arises or law enforcement action is commenced relating to your Account or your use of the Services for any reason, Smart Apes may terminate your Account immediately with or without notice.",
      "Users may terminate their Account if they notify Smart Apes in writing (including via email at irfan@xxxxxxxxx.com) of their desire to do so. Notwithstanding any such termination, Users remain responsible and liable for any incomplete transaction (whether commenced prior to or after such termination), shipment of the product, payment for the product, or the like, and Users must contact Smart Apes after he or she has promptly and effectively carried out and completed all incomplete transactions according to the Service Terms. Smart Apes shall have no liability, and shall not be liable for any damages incurred due to the actions taken in accordance with this Section. Users waive any and all claims based on any such action taken by Smart Apes.",
      "You may only use the Services and/or open an Account if you are located in one of our approved countries, as updated from time to time.",
    ],
  },
  {
    title: "TERM OF USE",
    list: [
      "The license for use of this Site and the Services is effective until terminated. This license will terminate as set forth under these Service Terms or if you fail to comply with any term or condition of these Service Terms. In any such event, Smart Apes may effect such termination with or without notice to you.",
      <>
        You agree not to:
        <ol className={classes.orderedListBracketLetter}>
          {termAndUseRules.map((rule, index) => (
            <ListInfo key={index}>
              <li>{rule}</li>
            </ListInfo>
          ))}
        </ol>
      </>,
      "You understand that all Content, whether publicly posted or privately transmitted, is the sole responsibility of the person from whom such Content originated. This means that you, and not Smart Apes, are entirely responsible for all Content that you upload, post, email, transmit or otherwise make available through the Site. You understand that by using the Site, you may be exposed to Content that you may consider to be offensive, indecent or objectionable. To the maximum extent permitted by applicable law, under no circumstances will Smart Apes be liable in any way for any Content, including, but not limited to, any errors or omissions in any Content, or any loss or damage of any kind incurred as a result of the use of, or reliance on, any Content posted, emailed, transmitted or otherwise made available on the Site.",
      "You acknowledge that Smart Apes and its designees shall have the right (but not the obligation) in their sole discretion to pre-screen, refuse, delete, stop, suspend, remove or move any Content, including without limitation any Content or information posted by you, that is available on the Site without any liability to you. Without limiting the foregoing, Smart Apes and its designees shall have the right to remove any Content (i) that violates these Service Terms or our Prohibited and Restricted Items Policy; (ii) if we receive a complaint from another User; (iii) if we receive a notice or allegation of intellectual property infringement or other legal instruction or request for removal; or (iv) if such Content is otherwise objectionable. We may also block delivery of a communication (including, without limitation, status updates, postings, messages and/or chats) to or from the Services as part of our effort to protect the Services or our Users, or otherwise enforce the provisions of these Terms and Conditions. You agree that you must evaluate, and bear all risks associated with, the use of any Content, including, without limitation, any reliance on the accuracy, completeness, or usefulness of such Content. In this regard, you acknowledge that you have not and, to the maximum extent permitted by applicable law, may not rely on any Content created by Smart Apes or submitted to Smart Apes, including, without limitation, information in Smart Apes Forums and in all other parts of the Site.",
      "You acknowledge, consent to and agree that Smart Apes may access, preserve, and/or disclose your Account information and Content to any legal, regulatory, or governmental authority, the relevant rights owner, or other third parties if required to do so by law, pursuant to an order of a court or lawful request by any governmental or regulatory authority having jurisdiction over Smart Apes, or in a good faith belief that such access preservation or disclosure is reasonably necessary to: (a) comply with legal process; (b) enforce these Service Terms or our Prohibited and Restricted Items Policy; (c) respond to claims that any Content violates the rights of third parties, including intellectual property rights; (d) respond to your requests for customer service; or (e) protect the rights, property or personal safety of Smart Apes, its Users and/or the public.",
    ],
  },
  {
    title: "VIOLATION OF OUR TERMS OF SERVICE",
    list: [
      <>
        Violations of this policy may result in a range of actions, including,
        without limitation, any or all of the following:
        <ul className={classes.bulletList}>
          {violationTerms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </>,
      <>
        If you believe a User on our Site is violating these Terms of Service,
        please contact{" "}
        <Link href="mailto:irfan@growthlearningsolutions.com">
          irfan@growthlearningsolutions.com
        </Link>
        .
      </>,
    ],
  },
  {
    title: "REPORTING INTELLECTUAL PROPERTY RIGHTS INFRINGEMENT",
    list: [
      "As stated above, Smart Apes does not allow listings that violate the intellectual property rights of brands or other intellectual property rights owners (“IPR Owner”).",
      "Except where expressly stated otherwise, the Users are independent individuals or businesses and they are not associated with Smart Apes in any way and Smart Apes is neither the agent nor representative of the Users and does not hold and/or own any of the merchandises listed on the Site.",
      "Complaints under this Section 8 must be provided in the form prescribed by Smart Apes, which may be updated from time to time, and must include at least the following: (a) a physical or electronic signature of an IPR Owner or IPR Agent (collectively, “Informant”); (b) a description of the type and nature of intellectual property right that is allegedly infringed and proof of rights; (c) a description of the nature of alleged infringement with sufficient details to enable Smart Apes to assess the complaint; (d) URL(s) of the listing(s) which contain the alleged infringement; (e) sufficient information to allow Smart Apes to contact the Informant, such as Informant’s physical address, telephone number and e-mail address; (f) a statement by Informant that the complaint is filed on good faith belief and that the use of the intellectual property as identified by the Informant is not authorised by the IPR Owner or the law; (g) a statement by the Informant that the information in the notification is accurate, that the Informant will indemnify us for any damages we may suffer as a result of the information provided by the Informant, and that the Informant has the appropriate right or is authorised to act on the IPR Owner’s behalf in all matters relating to the complaint.",
      "Smart Apes acknowledges a manufacturer’s right to enter into certain exclusive distribution agreements or minimum advertised price agreements for its products. However, violations of such agreements do not constitute intellectual property rights infringement. As the enforcement of these agreements is a matter between the manufacturer and the sellers, Smart Apes does not assist in this type of enforcement activity and does not enforce exclusive distribution rights or price-control matters except within the countries that have laws specifically governing selective or exclusive distribution.",
      "Each and every Seller agrees to hold Smart Apes and its Affiliates harmless from all claims, causes of action, damages and judgments arising out of any removal of any Content or product listings pursuant to or in relation to any intellectual property infringement claim.",
    ],
  },
  {
    title: "PURCHASE AND PAYMENT",
    list: [
      <>
        Smart Apes supports one or more of the following payment methods in each
        country it operates in:
        <ol className={classes.orderedListBracketRoman}>
          <li>
            Credit Card payments are processed through third-party payment
            channels and the type of credit cards accepted by these payment
            channels may vary depending on the jurisdiction you are in.
          </li>
          <li>
            Instalment Purchase Plan Buyers may pay via instalment for orders
            exceeding S$200. Payment via instalments are processed through
            third-party channels. The banks that currently support instalment
            plans are UOB, OCBC and DBS.
          </li>
        </ol>
      </>,
      "Buyer may only change their preferred mode of payment for their purchase prior to making payment.",
      "Smart Apes takes no responsibility and assume no liability for any loss or damages to Buyer arising from shipping information and/or payment information entered by Buyer or wrong remittance by Buyer in connection with the payment for the items purchased. We reserve the right to check whether Buyer is duly authorised to use certain payment method, and may suspend the transaction until such authorisation is confirmed or cancel the relevant transaction where such confirmation is not available.",
    ],
  },
  {
    title: "SELLER BANK",
    list: [
      "Your Account allows the storage of money you receive from your sales proceeds made on the Platform (“Seller Bank”). The sum of this money, minus any withdrawals, will be reflected as your Seller Bank’s balance. ",
      "You may transfer funds from your Seller Bank (up to the amount of your Seller Bank balance) to your linked bank account (“Linked Account”) by submitting a transfer request (“Withdrawal Request”) a maximum of once per day. Smart Apes may also automatically transfer funds from your Seller Bank to your Linked Account on a regular basis, as determined by Smart Apes. Smart Apes shall only process such transfers on business days and such transfers may take up to three business days to be credited to your Linked Account. Smart Apes is only able to make payment to Sellers via bank transfer. Hence, Sellers are required to provide Smart Apes with their bank account details in order to receive payments from their Seller Bank.",
      "Sellers are entitled to one (1) free Withdrawal Request per week (“Weekly Withdrawal Limit”). Smart Apes may impose a fee of SGD0.50 for each additional Withdrawal Request made in excess of the Weekly Withdrawal Limit (“Withdrawal Fee”). The Weekly Withdrawal Limit and the Withdrawal Fee are subject to change at Smart Ape’s sole discretion.",
      "Money from your sale of items on Smart Apes shall be credited to your Seller Bank within three (3) days after the item is delivered to Buyer or immediately after Buyer has acknowledged that they have received the item.",
      "Once submitted, you may not modify or cancel a Withdrawal Request.",
      "If there is an error in the processing of any transaction, you authorize us to initiate debit or credit entries to your designated bank account, to correct such error, provided that any such correction is made in accordance with applicable laws and regulations. If we are unable to debit your designated bank account for any reason, you authorize us to resubmit the debit, plus any applicable fees, to any other bank account or payment instrument that you have on file with us or to deduct the debit and applicable fees from your Seller Bank in the future.",
      "You authorize us to initiate debit or credit entries to your Seller Bank: (i) to correct any errors in the processing of any transaction; (ii) where Smart Apes has determined that you have engaged in fraudulent or suspicious activity and/or transactions; (iii) in connection with any lost, damaged or incorrect items; (iv) in connection with any rewards or rebates; (v) in connection with any uncharged fees; (vi) in connection with the settlement of any transaction dispute, including any compensation due to, or from, you;  (vii) in connection with any banned items or items that are detained by customs; (viii) in connection with any change of mind agreed to by both Buyer and Seller; and (ix) to purchase Advertising Credits where you have activated the Advertising Credits Top Up Feature and your Advertising Credits have fallen below your Advertising Credits Minimum Amount.",
    ],
  },
  {
    title: "SMART APES GUARANTEE",
    list: [
      "Smart Apes Guarantee is a service provided by Smart Apes or its authorised agent to protect purchases. To protect against the risk of liability, payment for purchases made to Seller using the Services will be held by Smart Apes or its authorised agent (“Smart Apes Guarantee Account”). Seller will not receive interest or other earnings from the sum you have paid into Smart Apes Guarantee Account.",
      <>
        After Buyer makes payment for his/her order (“Buyer’s Purchase Monies”),
        Buyer’s Purchase Monies will be held in Smart Apes Guarantee Account
        until:
        <ol className={classes.orderedListBracketLetter}>
          {guaranteeTerms.map((term, index) => (
            <ListInfo key={index}>
              <li>{term}</li>
            </ListInfo>
          ))}
        </ol>
      </>,
      "Payments made through Smart Apes channels will be held in the Smart Apes Guarantee Account for a specified period of time (the “Smart Apes Guarantee Period”). Buyer may apply for a one-time extension (if applicable) of Smart Apes Guarantee Period prior to the expiry of the applicable Smart Apes Guarantee Period, subject to and in accordance with the Refunds and Return Policy. Upon Buyer’s application, Smart Apes Guarantee Period may be extended for a maximum period of three (3) days unless Smart Apes in its sole discretion determines that a longer extension is appropriate or required.",
      "If, for any reason, the Seller's bank account cannot be credited and/or the Seller cannot be contacted, Smart Apes will use reasonable endeavours to contact the Seller using the contact details provided by him/her.  In the event that the Seller cannot be contacted and the Buyer’s Purchase Monies remain unclaimed for more than twelve (12) months after they become due to the Seller, Smart Apes will deal with such unclaimed Buyer's Purchase Monies in accordance with any applicable laws.",
      "Seller/Buyer must be the beneficial owner of the Account and conduct transaction on the Site only on behalf of him or herself. Smart Apes may require Seller or Buyer to provide his or her personal data such as recent identity photograph, bank account details and/or any other such documentation necessary, for verification purposes, including verification required by third party payment processing and logistic service providers. Seller/Buyer hereby grants Smart Apes his/her consent to use or provide to third party his/her personal data to facilitate his/her use of the Site. Further, Seller/Buyer authorises Smart Apes to use his/her personal data to make any inquires we consider necessary to validate his/her identity with the appropriate entity such as his/her bank.",
      "The Smart Apes Guarantee is in addition and without limitation to Buyer’s and Seller’s obligations under applicable law, which may go above and beyond what is provided for by the Smart Apes Guarantee. The Smart Apes Guarantee is neither intended nor designed to assist Buyer or Seller in complying with its own legal obligations, for which each party will remain solely responsible, and Smart Apes accepts no liability in connection with the same. Without limitation, the Smart Apes Guarantee does not constitute a product warranty.",
      "Buyer and Seller acknowledge and agree that Smart Ape’s decision (including any appeals) in respect of and relating to any issues concerning the Smart Apes Guarantee is final.",
      "For the avoidance of doubt, any transactions not conducted on the Site will not qualify for the protection offered by Smart Apes Guarantee.",
    ],
  },
  {
    title: "SMART APES (SA) VOUCHER REWARD SYSTEM",
    list: [
      "Users may earn loyalty points (“SA”) by buying merchandise on the Site using the Smart Apes Guarantee system or through participation in other Smart Apes activities as Smart Apes may from time to time determine (“Eligible Activities”) based on the conversion rate determined by Smart Apes in its sole discretion. Generally, SA voucher will be credited to a User’s Account upon the completion of a successful transaction or activity approved by Smart Apes. You are eligible to participate in the SA voucher reward system if you are a User and your Account does not exclude you from participation.1 Users may earn loyalty points (“SA Voucher”) by buying merchandise on the Site using the Smart Apes Guarantee system or through participation in other Smart Apes activities as Smart Apes may from time to time determine (“Eligible Activities”) based on the conversion rate determined by Smart Apes in its sole discretion. Generally, SA voucher will be credited to a User’s Account upon the completion of a successful transaction or activity approved by Smart Apes. You are eligible to participate in the SA voucher reward system if you are a User and your Account does not exclude you from participation.",
      "Transactions not completed on the Site using the Smart Apes Guarantee do not qualify for the SA voucher reward system. Smart Apes may at its sole discretion exclude categories of items from the SA voucher reward system.",
      "SA voucher have no monetary value, does not constitute your property and cannot be purchased, sold, transferred or redeemed for cash.1 SA voucher credited to Buyers have no monetary value, do not constitute Buyer’s property and cannot be purchased, sold, transferred or redeemed for cash by Buyer.",
      "Subject to Smart Apes rules and regulation as determined, varied or modified by Smart Apes from time to time, subject to any cap imposed by Smart Apes at its sole discretion, Users may redeem or donate SA voucher by sending a request to Smart Apes and use SA voucher to donate to a charity registered with Smart Apes or offset the purchase price of selected items when making purchases on the Site (as the case may be) as advised by Smart Apes from time to time. All refunds will be subject to Smart Ape’s Refunds and Return Policy under Section 15.4.",
      "The SA voucher you redeem or donate will be deducted from your SA voucher balance. Each SA voucher comes with an expiry date. Do check your account details on the Site for SA voucher balances and expiry date.",
      "From time to time, we may tell you that bonus SA voucher will be awarded for particular Eligible Activities. This may include but is not limited to purchases you make with participating Sellers or pursuant to specific promotional offers. We will notify you of the terms of such bonus awards if any from time to time.  ",
      "If you have a dispute in relation to the number of SA voucher which you have been awarded in respect of an Eligible Activity, such a dispute must be made within one (1) month from the date of the Eligible Activity. We may require you to provide evidence to support your claim. ",
      "Smart Apes gives no warranty and accepts no responsibility as to the ultimate tax treatment of SA voucher. You will need to check with your tax advisor whether receiving SA voucher affects your tax situation. ",
      "Smart Apes reserves the right to (i) discontinue the SA voucher reward system at any time at its sole discretion, and/or (ii) cancel or suspend a User’s right to participate in SA voucher reward system, including the ability to earn and redeem SA voucher, at its sole discretion.",
    ],
  },
  {
    title: "SMART APES VOUCHER MARKETING SERVICES",
    list: [
      "Sellers may purchase SA voucher for gratuitous distribution to Buyers for marketing purposes under the “Marketing Centre” section of the Seller Account (“Marketing Centre”).  If you are a Seller that purchases SA voucher, you will be deemed to have consented to the terms and conditions described in this Section, and any explanatory materials published on this Site, the Seller Account or otherwise communicated to Sellers in writing (“Seller SA voucher Rules”).",
      "In order to purchase SA voucher, you must be an eligible Seller under the Seller SA voucher Rules. At the time you purchase and pay for the SA voucher, your Account must not be suspended.",
      "You may purchase SA voucher via the payment methods set out in the Marketing Centre.  After payment is completed, the SA voucher will be issued to your Account for giveaway to Buyers within 24 hours, and shall expire six (6) months after purchase or such other time as determined by Smart Apes. Except as otherwise provided in the applicable Seller SA voucher Rules, you may not cancel the order and/or request for a refund after you have purchased SA voucher and completed the payment process.",
      "SA voucher purchased by Sellers may only be given away, free-of-charge, to Buyers via promotional channels made available in the Marketing Centre.  You may not sell, redeem, or otherwise deal in, SA voucher under any circumstances.  You agree that failure to comply with this section or any of the Seller SA voucher Rules may, without limitation, result in the forfeiture of SA voucher purchased by you, in addition to any other actions or remedies that Smart Apes may take or enforce.",
      "You understand and agree that Smart Apes does not warrant or guarantee any increase in viewership or sales of your items as a result of the purchase and gratuitous distribution of SA voucher.",
      "You are advised to only purchase SA voucher after fully considering your budget and intended advertising objectives. Except as otherwise provided in these Service Terms or the Seller SA voucher Advertising Rules, Smart Apes shall not be liable for any compensation or be subject to any liability (including but not limited to actual expenses and lost profits) for the results or intended results of purchasing SA voucher.",
      "if, notwithstanding anything in these terms of service, SMART APES is found by a court of competent jurisdiction to be liable (including for gross negligence) in relation to the purchase by you of SA voucher, then, to the maximum extent permitted by applicable law, its liability to you or to any third party is limited to the amount paid by you for the SA voucher in question only.",
    ],
  },
  {
    title: "SMART APES CASHBACK VOUCHER",
    list: [
      "Users may receive a voucher entitling them to additional SA voucher (the “SA Cashback Voucher”) on eligible purchases on the Site. Upon the completion of a successful transaction where the SA Cashback Voucher has been applied, additional SA voucher will be credited to a User’s Account based on the conversion rate as indicated in the terms and conditions of such SA Cashback voucher (“Additional SA voucher Rate”) or as determined by Smart Apes in its sole discretion. SA voucher credited to a User following the redemption of a SA Cashback Voucher shall have the same terms and conditions (including in relation to expiry) as regular SA voucher.",
      "Smart Apes may allow Sellers to generate their own SA Cashback Vouchers (each a “Seller SA Cashback Voucher”), which Buyers may apply to eligible purchases from the Seller’s store. If you are a Seller that generates a Seller SA Coin Cashback Voucher, you will be deemed to have consented to the terms and conditions described in this Section.",
      "When generating a Seller SA Cashback Voucher, the Additional SA voucher Rate will be determined by Seller at the Seller’s own discretion. Seller shall be solely responsible for the accuracy of the Additional SA voucher Rate.",
      "For each completed transaction where a Buyer successfully applies a Seller SA Coin Cashback Voucher, the Seller shall pay Smart Apes the value of the additional SA voucher credited to the Buyer (“SA voucher Cashback Price”). The SA voucher Cashback Price is calculated in Singapore Dollars as the number of additional SA voucher to be credited to the Buyer’s Account divided by 100, rounded up to the nearest cent. The Coin Cashback Price is subject to GST (“SA voucher Cashback Tax Amount”), and the Seller is responsible for such SA voucher Cashback Tax Amount.",
      "Following the successful completion of a transaction, Smart Apes shall deduct the SA voucher Cashback Price and SA voucher Cashback Tax Amount from the Buyer’s Purchase Monies, and remit the balance to the Seller in accordance with Section 11.2. Smart Apes shall issue receipts or tax invoices for the SA voucher Cashback Price and SA voucher Cashback Tax Amount on request. For the avoidance of doubt, the SA voucher Cashback Price and SA voucher Cashback Tax Amount applies in addition to the Transaction Fee and Tax Amount under the Terms of Service.",
      "The SA voucher Cashback Price and SA voucher Cashback Tax Amount is strictly non-refundable.",
    ],
  },
  {
    title: "CANCELLATION, RETURN AND REFUND",
    list: [
      "Buyer may only cancel his/her order prior to the payment of Buyer’s Purchase Monies into Smart Apes Guarantee Account.",
      "Buyer may apply for the return of the purchased item and refund prior to the expiry of Smart Apes Guarantee Period, if applicable, subject to and in accordance with Smart Ape’s Refunds and Return Policy. Please refer to Smart Ape’s Refunds and Return Policy for further information.",
      "Smart Apes reserves the right to cancel any transaction on the Site and Buyer agrees that Buyer’s sole remedy will be to receive a refund of the Buyer’s Purchase Monies paid into Smart Apes Guarantee Account.",
      "If you have redeemed SA voucher for your transaction and you are successful in obtaining a refund based on Smart Ape’s Refunds and Return Policy, Smart Apes shall refund the monies you have actually paid for the item and credit back any redeemed SA voucher to your Account separately.",
      "Smart Apes does not monitor the cancellation, return and refund process for offline payment.",
      "Refunds to Buyers shall be made to their Smart Bank wallet within five (5) days of the return or refund request being approved.",
    ],
  },
  {
    title: "DELIVERY",
    list: [
      "Smart Apes will inform Seller when Smart Apes receives Buyer’s Purchase Monies. Unless otherwise agreed with Smart Apes, Seller should then make the necessary arrangements to have the purchased item delivered to Buyer and provide details such as the name of the delivery company, the tracking number, etc. to Buyer through the Site.",
      "Seller must use his/her best effort to ensure that Buyer receives the purchased items within, whichever applicable, the Smart Apes Guarantee Period or the time period specified (for offline payment) by Seller on Seller’s listing. ",
      "Users understand that Seller bears all risk attached to the delivery of the purchased item(s) and warrants that he/she has or will obtain adequate insurance coverage for the delivery of the purchased item(s). In the event where the purchased item(s) is damaged, lost or failure of delivery during the course of delivery, Users acknowledge and agree that Smart Apes will not be liable for any damage, expense, cost or fees resulted therefrom and Seller and/or Buyer will reach out to the logistic service provider to resolve such dispute.",
      "For Cross-Border Transaction. Users understand and acknowledge that, where a product listing states that the product will ship from overseas, such product is being sold from a Seller based outside of Singapore, and the importation and exportation of such product is subject to local laws and regulations. Users should familiarise themselves with all import and export restrictions that apply to the designating country. Users acknowledge that Smart Apes cannot provide any legal advice in this regard and agrees that Smart Apes shall not bear any risks or liabilities associated with the import and export of such products to Singapore.",
      "Where the Buyer elects to have a purchased item delivered by SingPost Normal Mail, all costs for delivering the purchased item shall be borne solely by the Seller.",
      "Where the Buyer elects to have a purchased item delivered by any other shipping method, the fee payable to the delivery company (“Shipping Fee”) shall be borne by the Buyer, Seller and Smart Apes in such proportions as may be determined by Smart Apes and published on the Site from time to time.  Smart Apes shall (i) collect the Buyer’s proportion of the Shipping Fee from the Buyer, (ii) deduct the Seller’s proportion of the Shipping Fee from the Buyer’s Purchase Monies in accordance with Section 11.2, and (iii) pay the total Shipping Fee to the delivery company.",
      "For the avoidance of doubt, any Smart Apes-supported logistics services provided to Buyers and Sellers for overseas freight of goods from outside of Singapore to destinations within Singapore, as well as onshore logistics services for local freight, are provided or managed by …………….. Private Limited.",
    ],
  },
  {
    title: "SELLER’S RESPONSIBILITIES",
    list: [
      "Seller shall properly manage and ensure that relevant information of the item (such as the price, item specifications and inventory amount) and any terms and conditions for sales is updated on Seller’s listing and shall not post inaccurate, misleading or incomplete information.",
      "The price of items for sale will be determined by the Seller at his/her own discretion. ",
      "For local orders where items are located in Singapore at the point of sale, Seller, if registered for Goods and Services Tax (“GST”) in Singapore, is required to provide the GST inclusive prices to Buyer and shall issue tax invoice, receipt or credit note, where applicable, to Buyer on request.",
      "For international orders where items are located outside Singapore at the point of sale, the price of an item shall include any GST, import taxes, customs duties and fees levied by the Singapore authorities upon importation and Seller shall not charge Buyer such amounts additionally and separately, with the exception of imports under clause 17.5.",
      "Sellers who deliver items using incoterm “Delivery Duty Unpaid (DDU)” for the import of goods from Japan to Singapore are required to inform Buyer that import taxes may be separately collected by the carrier upon delivery of goods.",
      "Seller is responsible for responding to Buyer’s queries on Seller’s GST registration status.",
      "Seller agrees that Smart Apes may at its discretion engage in promotional activities to induce transactions between Buyer and Seller by reducing, discounting or refunding fees, or in other ways. The final price that Buyer will pay actually will be the price that such adjustment is applied to.",
      "For the purpose of promoting the sales of the items listed by Seller, Smart Apes may post such items (at adjusted price) on third-party websites (such as portal sites and price comparison sites) and other websites (domestic or foreign) operated by Smart Apes.",
      "Under Sections 17.3 and 17.4, Seller acknowledges and agrees that Seller will be responsible for paying all taxes, customs and duties for the item sold and Smart Apes cannot provide any legal or tax advice in this regard. As tax laws and regulations may change from time to time, Sellers are advised to seek professional advice if in doubt.",
      "Seller acknowledge and agrees that Seller’s violation of any of Smart Ape’s polices will result in a range of actions as stated in Section 7.1.",
    ],
  },
  {
    title: "PAID ADVERTISING",
    list: [
      `Smart Apes on an ongoing basis. Sellers may purchase the Paid Advertising services. Smart Apes provides the Paid Advertising services in accordance with these Terms of Service and any explanatory materials published on this Site, the Paid Advertising Site or otherwise communicated to Sellers in writing (hereinafter referred to as the "Paid Advertising Rules"). Sellers who purchase Paid Advertising services agree to be bound by the Paid Advertising Rules. If you are not agreeable to being bound by the Paid Advertising Rules, do not buy any Paid Advertising Services.`,
      "In order to purchase Paid Advertising services, you must be an eligible Seller under the Paid Advertising Rules. At the time when you purchase and pay for the Paid Advertising services, your Account must not be suspended.",
      "You may purchase Paid Advertising services by purchasing advertising credits on the Paid Advertising Site or other site/s (“Advertising Credits”), and fees payable for the Paid Advertising services will be deducted from the Advertising Credits by Smart Apes. All Advertising Credits will be subject to goods and services tax and expire after six (6) months of purchase, or such other time as determined by Smart Apes. Except as otherwise provided in the applicable Paid Advertising Rules, you may not cancel the order and/or request for a refund after you have purchased Advertising Credits and completed the payment process.",
      "You may also choose to have your Advertising Credits automatically topped up via your Seller Bank (“Advertising Credits Top Up Feature”) if your Advertising Credits balance falls below an amount set by you (“Advertising Credits Minimum Amount”). When activating the Advertising Credits Top Up Feature, you may choose the Advertising Credits Minimum Amount and the amount of top up, and you consent to the debit of your Seller Bank in accordance with Section 10 of these Service Terms.",
      "You have the option to purchase Keyword Advertising services at the time you list an item for sale or subsequently. When you purchase Keyword Advertising, you can set different budgets, keywords, marketing periods, etc. for each item in accordance with the Paid Advertising Rules. The Keyword Advertising service for each item will be activated and will expire on the respective dates set by you (the “Paid Advertising Period”). You will not be entitled to transfer the remaining Paid Advertising Period or Advertising Credits to other items if an item is sold or unlisted during the Paid Advertising Period you set for that item. The Advertising Credits will also not be refunded.",
      "You have the option to purchase Flash Deal Advertising services during the periods nominated by Smart Apes.  When you purchase Flash Deal Advertising services, you may nominate items to be included in a flash sale and Smart Apes may include such items in a flash sale at its sole and absolute discretion. Advertising Credits are not transferable to other items once used, regardless of whether the items are sold/unsold, or unlisted during the flash sale.  The Advertising Credits will also not be refunded.",
      "The goods you list on the Site must comply with all relevant laws and regulations, the Paid Advertising Rules, these Service Terms and the Prohibited and Restricted Items Policy. You understand and agree that Smart Apes has the right to immediately remove any listing which violates any of the foregoing and any Paid Advertising fees that you have paid or Advertising Credits you have used in relation to any listing removed pursuant to this Section 17.7 will not be refunded. Smart Apes will also not be liable to compensate you for any loss whatsoever in relation to listings removed pursuant to this Section 17.7. ",
      "You understand and agree that Smart Apes does not warrant or guarantee any increase in viewership or sales of your items as a result of the Paid Advertising services.",
      "You are advised to only purchase Paid Advertising services after fully considering your budget and intended advertising objectives. Except as otherwise provided in these Terms of Service or the Paid Advertising Rules, Smart Apes shall not be liable for any compensation or be subject to any liability (including but not limited to actual expenses and lost profits) for the results or intended results of any Paid Advertising service.",
      "if, notwithstanding anything in these terms of service, Smart Apes is found by a court of competent jurisdiction to be liable (including for gross negligence) in relation to any paid advertising service, then, to the maximum extent permitted by applicable law, its liability to you or to any third party is limited to the amount paid by you for the paid advertising service in question only.",
      "For Sellers located in Singapore, the tax invoices for the automatic top up of Paid Advertising can be retrieved from the Seller Bank.",
    ],
  },
  {
    title: "TRANSACTION FEES",
    list: [
      "Smart Apes charges a fee for all successful transactions completed on the Site (“Transaction Fee”). The Transaction Fee is borne by the Seller, and is calculated as two percent (12%) of the Buyer’s Purchase Monies, rounded up to the nearest cent. The Transaction Fee is subject to GST (“Tax Amount”), and the Seller is responsible for such Tax Amount.",
      "For Sellers located outside of Singapore, Smart Apes charges a fee for all successful transactions completed on the Site (“Cross Border Fee”). The Cross Border Fee is borne by the Seller, and is calculated according to the rates as notified to such Sellers from time to time on the Site.  ",
      "Smart Apes charges an additional fee for all successful transactions completed on the Site where the Buyer selects SPayLater as the payment method (“SPayLater Fee”). The SPayLater Fee is borne by the Sellers, and is calculated according to the rates as notified to such Sellers from time to time on the Site. The SPayLater Fee is subject to GST (“SPayLater Tax Amount”), and the Seller is responsible for such SPayLater Tax Amount. ",
      "For Sellers that sell Products on the Platform through the Shopify API, Smart Apes charges a fee for all successful transactions completed on the Site (“Shopify Transaction Fee”).  The Shopify Transaction Fee is borne by the Seller, and is calculated as one and a half percent (1.5%) of the Buyer’s Purchase Monies, rounded up to the nearest cent. The Shopify Transaction Fee is subject to GST (“Shopify Tax Amount”), and the Seller is responsible for such Shopify Tax Amount.  For the avoidance of doubt, the Shopify Transaction Fee and Shopify Tax Amount applies in addition to the Transaction Fee and Tax Amount.",
      "Following the successful completion of a transaction, Smart Apes shall deduct the Transaction Fee, Tax Amount, Cross Border Fee, SPayLater Fee, SPayLater Tax Amount, Shopify Transaction Fee, and Shopify Tax Amount (as applicable) from the Buyer’s Purchase Monies, and remit the balance to the Seller in accordance with Section 11.2. Smart Apes shall issue receipts or tax invoices for the Transaction Fee, Tax Amount, Shopify Transaction Fee, and Shopify Tax Amount paid by Seller on request. For Sellers located in Singapore, these tax invoices can be retrieved from the Seller Bank.",
    ],
  },
  {
    title: "OVERSEAS VENDOR REGISTRATION",
    list: [
      `For Sellers located outside of Singapore selling Digital Services that fall under the scope of the Overseas Vendor Registration Regime ("Overseas Digital Services Seller"), supplies of Digital Services to Buyers (i.e. individuals and non-GST registered businesses) are subject to GST ("OVR GST Amount"). If Buyer is GST registered, the responsibility lies with the GST-registered Buyer to provide his GST registration number to Smart Apes and Seller as evidence that he is indeed GST-registered. With effect from 1 January 2023, the scope of the Overseas Vendor Registration Regime will be extended to include non-digital services that can be supplied and received remotely and low value goods sold by sellers from outside of Singapore. `,
      "Smart Apes shall withhold and timely remit the appropriate OVR GST Amount to the Singapore Tax authorities. The Overseas Digital Services Seller shall ensure that all applicable taxes required to be charged on the sale of the Digital Service, if any, are duly applied. The Overseas Digital Services Seller shall cooperate and endeavour to provide Smart Apes with all necessary information in order to comply with the applicable tax requirements under the Overseas Vendor Registrations regime. With effect from 1 January 2023, the scope of the Overseas Vendor Registration Regime will be extended to include non-digital services that can be supplied and received remotely and low value goods sold by sellers from outside of Singapore.",
    ],
  },
  {
    title: "DISPUTES",
    list: [
      "In the event a problem arises in a transaction, such problem shall be resolved according to Smart Ape’s policies.",
      "Each Buyer and Seller covenants and agrees that it will not bring suit or otherwise assert any claim against Smart Apes or its Affiliates (except where Smart Apes or its Affiliates is the Seller of the product that the claim relates to) in relation to any transaction made on the Site or any dispute related to such transaction.",
      "Users covered under Smart Apes Guarantee may send written request to Smart Apes to assist them in resolving issues which may arise from a transaction upon request. Smart Apes may, at its sole discretion and with absolutely no liability to Seller and Buyer, take all necessary steps to assist Users resolving their dispute. For more information, please refer to Smart Ape’s Refunds and Return Policy.",
      "To be clear, the services provided under this Section 21 are only available to Buyers covered under Smart Apes Guarantee. Buyer using other payment means for his/her purchase should contact Seller directly.",
    ],
  },
  {
    title: "FEEDBACK",
    list: [
      <>
        Smart Apes welcomes information and feedback from our Users which will
        enable Smart Apes to improve the quality of service provided. Please
        refer to our feedback procedure below for further information:
        <ol className={classes.orderedListBracketRoman}>
          {feedbackTerms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ol>
      </>,
    ],
  },
  {
    title: "DISCLAIMERS",
    list: [
      `the services are provided "as is" and without any warranties, claims or representations made by Smart Apes of any kind either expressed, implied or statutory with respect to the services, including, without limitation, warranties of quality, performance, non-infringement, merchantability, or fitness for a particular purpose, nor are there any warranties created by course of dealing, course of performance or trade usage. Without limiting the foregoing and to the maximum extent permitted by applicable law, smart apes does not warrant that the services, this site or the functions contained therein will be available, accessible, uninterrupted, timely, secure, accurate, complete or error-free, that defects, if any, will be corrected, or that this site and/or the server that makes the same available are free of viruses, clocks, timers, counters, worms, software locks, drop dead devices, Trojan-horses, routings, trap doors, time bombs or any other harmful codes, instructions, programs or components.`,
      "you acknowledge that the entire risk arising out of the use or performance of the site and/or the services remains with you to the maximum extent permitted by applicable law.",
      "Smart Apes have no control over and, to the maximum extent permitted by applicable law, does not guarantee or accept any responsibility for: (a) the fitness for purpose, existence, quality, safety or legality of items available via the services; or (b) the ability of sellers to sell items or of buyers to pay for items. If there is a dispute involving one or more users, such users agree to resolve such dispute between themselves directly and, to the maximum extent permitted by applicable law, release Smart Apes and its affiliates from any and all claims, demands and damages arising out of or in connection with any such dispute.",
    ],
  },
  {
    title: "EXCLUSIONS AND LIMITATIONS OF LIABILITY",
    list: [
      <>
        to the maximum extent permitted by applicable law, in no event shall
        Smart Apes be liable whether in contract, warranty, tort (including,
        without limitation, negligence (whether active, passive or imputed),
        product liability, strict liability or other theory), or other cause of
        action at law, in equity, by statute or otherwise, for:
        <ol className={classes.orderedListBracketRoman}>
          {limitationsTerms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ol>
      </>,
      "you acknowledge and agree that your only right with respect to any problems or dissatisfaction with the services is to request for termination of your account and/or discontinue any use of the services.",
      "if, notwithstanding the previous sections, Smart Apes is found by a court of competent jurisdiction to be liable (including for gross negligence), then, to the maximum extent permitted by applicable law, its liability to you or to any third party is limited to the lesser of: (a) any amounts due and payable to you pursuant to the Smart Apes guarantee; and (b) sg $100 (one hundred Singapore dollars).",
      "nothing in these terms of service shall limit or exclude any liability for death or personal injury caused by Smart Ape’s negligence, for fraud or for any other liability on the part of Smart Apes that cannot be lawfully limited and/or excluded.",
    ],
  },
  {
    title: "LINKS TO THIRD PARTY SITES AND SHARING VIDEOS FROM YOUTUBE",
    list: [
      "Third party links provided throughout the Site will let you leave this Site. These links are provided as a courtesy only, and the sites they link to are not under the control of Smart Apes in any manner whatsoever and you therefore access them at your own risk. Smart Apes is in no manner responsible for the contents of any such linked site or any link contained within a linked site, including any changes or updates to such sites. Smart Apes is providing these links merely as a convenience, and the inclusion of any link does not in any way imply or express affiliation, endorsement or sponsorship by Smart Apes of any linked site and/or any of its content therein.",
      <>
        By sharing YouTube Content, you hereby agree to be bound by the YouTube
        Terms of Service (
        <Link href="https://www.youtube.com/t/terms">
          https://www.youtube.com/t/terms
        </Link>
        ).
      </>,
    ],
  },
  {
    title: "YOUR CONTRIBUTIONS TO THE SERVICES",
    list: [
      "By submitting Content for inclusion on the Services, you represent and warrant that you have all necessary rights and/or permissions to grant the licenses below to Smart Apes. You further acknowledge and agree that you are solely responsible for anything you post or otherwise make available on or through the Services, including, without limitation, the accuracy, reliability, nature, rights clearance, compliance with law and legal restrictions associated with any Content contribution. You hereby grant Smart Apes and its successors a perpetual, irrevocable, worldwide, non-exclusive, royalty-free, sub-licensable and transferable license to use, copy, distribute, republish, transmit, modify, adapt, create derivative works of, publicly display, and publicly perform such Content contribution on, through or in connection with the Services in any media formats and through any media channels, including, without limitation, for promoting and redistributing part of the Services (and its derivative works) without need of attribution and you agree to waive any moral rights (and any similar rights in any part of the world) in that respect. You understand that your contribution may be transmitted over various networks and changed to conform and adapt to technical requirements.",
      `Any Content, material, information or idea you post on or through the Services, or otherwise transmit to Smart Apes by any means (each, a "Submission"), is not considered confidential by Smart Apes and may be disseminated or used by Smart Apes without compensation or liability to you for any purpose whatsoever, including, but not limited to, developing, manufacturing and marketing products. By making a Submission to Smart Apes, you acknowledge and agree that S and/or other third parties may independently develop software, applications, interfaces, products and modifications and enhancements of the same which are identical or similar in function, code or other characteristics to the ideas set out in your Submission. Accordingly, you hereby grant Smart Apes and its successors a perpetual, irrevocable, worldwide, non-exclusive, royalty-free, sub-licensable and transferable license to develop the items identified above, and to use, copy, distribute, republish, transmit, modify, adapt, create derivative works of, publicly display, and publicly perform any Submission on, through or in connection with the Services in any media formats and through any media channels, including, without limitation, for promoting and redistributing part of the Services (and its derivative works). This provision does not apply to personal information that is subject to our privacy policy except to the extent that you make such personal information publicly available on or through the Services.`,
    ],
  },
  {
    title: "THIRD PARTY CONTRIBUTIONS TO THE SERVICES AND EXTERNAL LINKS",
    list: [
      "Each contributor to the Services of data, text, images, sounds, video, software and other Content is solely responsible for the accuracy, reliability, nature, rights clearance, compliance with law and legal restrictions associated with their Content contribution. As such, Smart Apes is not responsible to, and shall not, regularly monitor or check for the accuracy, reliability, nature, rights clearance, compliance with law and legal restrictions associated with any contribution of Content. You will not hold Smart Apes responsible for any User's actions or inactions, including, without limitation, things they post or otherwise make available via the Services.",
      "In addition, the Services may contain links to third party products, websites, services and offers. These third party links, products, websites and services are not owned or controlled by Smart Apes. Rather, they are operated by, and are the property of, the respective third parties, and may be protected by applicable copyright or other intellectual property laws and treaties. Smart Apes has not reviewed, and assumes no responsibility for the content, functionality, security, services, privacy policies, or other practices of these third parties. You are encouraged to read the terms and other policies published by such third parties on their websites or otherwise. By using the Services, you agree that Smart Apes shall not be liable in any manner due to your use of, or inability to use, any website or widget. You further acknowledge and agree that Smart Apes may disable your use of, or remove, any third party links, or applications on the Services to the extent they violate these Service Terms.",
    ],
  },
  {
    title: "YOUR REPRESENTATIONS AND WARRANTIES",
    list: [
      <>
        You represent and warrant that:
        <ol className={classes.orderedListBracketLetter}>
          <li>
            you possess the legal capacity (and in the case of a minor, valid
            parent or legal guardian consent), right and ability to enter into
            these Terms of Service and to comply with its terms; and
          </li>
          <li>
            you will use the Services for lawful purposes only and in accordance
            with these Service Terms and all applicable laws, rules, codes,
            directives, guidelines, policies and regulations.
          </li>
        </ol>
      </>,
    ],
  },
  {
    title: "FRAUDULENT OR SUSPICIOUS ACTIVITY",
    list: [
      <>
        If Smart Apes, in its sole discretion, believes that you may have
        engaged in any potentially fraudulent or suspicious activity and/or
        transactions, we may take various actions to protect Smart Apes, other
        Buyers or Sellers, other third parties or you from Reversals,
        Chargebacks, Claims, fees, fines, penalties and any other liability. The
        actions we may take include but are not limited to the following:
        <ListInfo>
          <ol className={classes.orderedListBracketLetter}>
            <li>
              We may close, suspend, or limit your access to your Account or the
              Services, and/or suspend the processing of any transaction;
            </li>
            <li>We may suspend your eligibility for Smart Apes Guarantee;</li>
            <li>
              We may hold, apply or transfer the funds in your Account as
              required by judgments and orders which affect you or your Account,
              including judgments and orders issued by courts in Singapore or
              elsewhere and directed to Smart Apes;
            </li>
            <li>
              We may refuse to provide the Services to you now and in the
              future;
            </li>
            <li>
              We may hold your funds for a period of time reasonably needed to
              protect against the risk of liability to Smart Apes or a third
              party, or if we believe that you may be engaging in potentially
              fraudulent or suspicious activity and/or transactions.
            </li>
          </ol>
        </ListInfo>
        <ListInfo>For the purposes of this Section:</ListInfo>
        <ListInfo>
          &quot;Chargeback&quot; means a request that a Buyer files directly
          with his or her debit or credit card company or debit or credit card
          issuing bank to invalidate a payment.
        </ListInfo>
        <ListInfo>
          &quot;Claim&quot; means a challenge to a payment that a Buyer or
          Seller files directly with Smart Apes.
        </ListInfo>
        <ListInfo>
          &quot;Reversal&quot; means the reversal of a payment by Smart Apes
          because (a) it is invalidated by the sender&apos;s bank, (b) it was
          sent to you in error by Smart Apes, (c) the sender of the payment did
          not have authorization to send the payment (for example: the sender
          used a stolen credit card), (d) you received the payment for
          activities that violated these Service Terms or any other Smart Apes
          policy, or (e) Smart Apes decided a Claim against you.
        </ListInfo>
      </>,
    ],
  },
  {
    title: "INDEMNITY",
    list: [
      `You agree to indemnify, defend and hold harmless Smart Apes, and its shareholders, subsidiaries, Affiliates, directors, officers, agents, co-branders or other partners, and employees (collectively, the "Indemnified Parties") from and against any and all claims, actions, proceedings, and suits and all related liabilities, damages, settlements, penalties, fines, costs and expenses (including, without limitation, any other dispute resolution expenses) incurred by any Indemnified Party arising out of or relating to: (a) any transaction made on the Site, or any dispute in relation to such transaction (except where Smart Apes or its Affiliates is the Seller in the transaction that the dispute relates to), (b) the Smart Apes Guarantee, (c) the hosting, operation, management and/or administration of the Services by or on behalf of Smart Apes, (d) your violation or breach of any term of these Service Terms or any policy or guidelines referenced herein, (e) your use or misuse of the Services, (f) your breach of any law or any rights of a third party, or (g) any Content uploaded by you.`,
    ],
  },
  {
    title: "SEVERABILITY",
    list: [
      "If any provision of these Service Terms shall be deemed unlawful, void, or for any reason unenforceable under the law of any jurisdiction, then that provision shall be deemed severable from these terms and conditions and shall not affect the validity and enforceability of any remaining provisions in such jurisdiction nor the validity and enforceability of the provision in question under the law of any other jurisdiction.",
    ],
  },
  {
    title: "GOVERNING LAW",
    list: [
      "These Service Terms shall be governed by and construed in accordance with the laws of the Republic of Singapore without regard to its conflict of law rules. The United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transaction Act, to the extent applicable, are expressly disclaimed. Unless otherwise required by applicable laws, any dispute, controversy, claim or difference of any kind whatsoever shall arising out of or relating to these Service Terms against or relating to Smart Apes or any Indemnified Party under these Service Terms shall be referred to and finally resolved by arbitration in Singapore in accordance with the Arbitration Rules of the Singapore International Arbitration Centre (“SIAC Rules”) for the time being in force, which rules are deemed to be incorporated by reference in this Section. There will be one (1) arbitrator and the language of the arbitration shall be English. ",
    ],
  },
  {
    title: "GENERAL PROVISIONS",
    list: [
      "Smart Apes reserves all rights not expressly granted herein.",
      "Smart Apes may modify these Service Terms at any time by posting the revised Service Terms on this Site. Your continued use of this Site after such changes have been posted shall constitute your acceptance of such revised Service Terms.",
      "You may not assign, sublicense or transfer any rights granted to you hereunder or subcontract any of your obligations.",
      "Nothing in these Service Terms shall constitute a partnership, joint venture or principal-agent relationship between you and Smart Apes, nor does it authorise you to incur any costs or liabilities on Smart Ape’s behalf. ",
      "The failure of Smart Apes at any time or times to require performance of any provision hereof shall in no manner affect its right at a later time to enforce the same unless the same is waived in writing.",
      "These Service Terms are solely for your and our benefit and are not for the benefit of any other person or entity, except for Smart Ape's Affiliates and subsidiaries (and each of Smart Ape's and its Affiliates' and subsidiaries' respective successors and assigns).",
      "The terms set forth in these Service Terms and any agreements and policies included or referred to in these Service Terms constitute the entire agreement and understanding of the parties with respect to the Services and the Site and supersede any previous agreement or understanding between the parties in relation to such subject matter. The parties also hereby exclude all implied terms in fact. In entering into the agreement formed by these Service Terms, the parties have not relied on any statement, representation, warranty, understanding, undertaking, promise or assurance of any person other than as expressly set out in these Service Terms. Each party irrevocably and unconditionally waives all claims, rights and remedies which but for this Section it might otherwise have had in relation to any of the foregoing. These Service Terms may not be contradicted, explained or supplemented by evidence of any prior agreement, any contemporaneous oral agreement or any consistent additional terms.",
      "You agree to comply with all applicable laws, statutes, regulations and codes relating to anti-bribery and corruption including without limitation the UK Bribery Act, the US Foreign Corrupt Practices Act and the Singapore Prevention of Corruption Act and confirm that you have and shall have in place all policies and procedures needed to ensure compliance with such requirements.",
      <>
        If you have any questions or concerns about these Terms of Service or
        any issues raised in these Service Terms or on the Site, please reach
        out to our Customer Service Team. LEGAL NOTICES: Please send all legal
        notices to irfan@growthlearningsolutions.com and Attention it to the
        “General Counsel”.
        <ListInfo>
          I HAVE READ THIS AGREEMENT AND AGREE TO ALL OF THE PROVISIONS
          CONTAINED ABOVE AND ANY REVISION THE SAME HEREAFTER. BY CLICKING THE
          “SIGN UP” OR “CONNECT WITH FACEBOOK” BUTTON DURING REGISTRATION, I
          UNDERSTAND THAT I AM CREATING A DIGITAL SIGNATURE, WHICH I INTEND TO
          HAVE THE SAME FORCE AND EFFECT AS IF I HAD SIGNED MY NAME MANUALLY.
        </ListInfo>
      </>,
    ],
  },
];
