// /* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import "rc-slider/assets/index.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

import MetaData from "./layout/MetaData";
import Loader from "./layout/Loader";

import { useSelector } from "react-redux";
import { date } from "yup";

const Home = () => {
  const baseURL = "https://mysogi.uat.com.ng/";

  const axios = Axios.create({
    baseURL,
  });
  const { loading } = useSelector((state) => state.auth);
  // const alert = useAlert();

  const [mailerState, setMailerState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    industry: "",
    employee: "",
    city: "",
  });

  const { name, email, phone, company, designation, industry, employee, city } =
    mailerState;

  const handleStateChange = (e) => {
    setMailerState({
      ...mailerState,
      [e.target.name]: e.target.value,
    });
  };

  const submitEmail = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("api/contact", mailerState);
    if (data.status === "success") {
      toast.success(data.message);
      setMailerState({
        name: "",
        email: "",
        phone: "",
        company: "",
        designation: "",
        industry: "",
        employee: "",
        city: "",
      });
    } else {
      toast.error("Mail Not Sent");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Terms and Conditions"} />
          <div className="w-100 overflow-x-hidden">
            <Header />
            <section className="header-part">
              <div className="container pd-lg-b-0">
                <div className="row">
                  <div className="col-md-12 col-12 pd-md-r-0 order-2 order-md-1">
                    <p className="tx-30 tx-center tx-bold mg-xl-50 mg-t-10">
                      Terms of Use
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="content-body">
              <div className="container pd-y-30 pd-md-b-0">
                <div className="row mg-t-10">
                  <div className="col-md-12 col-12 mg-t-20">
                    <div className="bd-0  card-height">
                      <div className="tx-left pd-md-y-40 pd-md-x-30">
                        <ol className="terms-list">
                          <li>
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Introduction
                            </p>
                            <ol className="terms-list">
                              <li>
                                These terms and conditions shall govern your use
                                of our websites.
                              </li>
                              <li>
                                By using our website, you accept these terms and
                                conditions in full; accordingly, if you disagree
                                with these terms and conditions or any part of
                                these terms and conditions, you must not use our
                                websites.
                              </li>
                              <li>
                                If you register with our websites, submit any
                                material to our websites or use any of our
                                website services, we will ask you to expressly
                                agree to these terms and conditions.
                              </li>
                              <li>
                                You must be at least 18 years of age to use our
                                websites; by using our websites or agreeing to
                                these terms and conditions, you warrant and
                                represent to us that you are at least 18 years
                                of age.
                              </li>
                              <li>
                                Our websites use cookies; by using our websites
                                or agreeing to these terms and conditions, you
                                consent to our use of cookies in accordance with
                                the terms of our privacy and cookies policy.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Copyright Notice
                            </p>
                            <ol className="terms-list">
                              <li>
                                Copyright (c) {new Date().getFullYear()} Mysogi
                                Company Limited.
                              </li>
                              <li>
                                Subject to the express provisions of these terms
                                and conditions:
                                <ol className="terms-inner-list">
                                  <li>
                                    we, together with our licensors, own and
                                    control all the copyright and other
                                    intellectual property rights in our websites
                                    and the material on our websites; and
                                  </li>
                                  <li>
                                    all the copyright and other intellectual
                                    property rights in our websites and the
                                    material on our websites are reserved.
                                  </li>
                                </ol>
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Licence to Use Websites
                            </p>
                            <ol className="terms-list">
                              <li>
                                You may:
                                <ol className="terms-inner-list">
                                  <li>
                                    view pages from our websites in a web
                                    browser;
                                  </li>
                                  <li>
                                    download pages from our websites for caching
                                    in a web browser;
                                  </li>
                                  <li>print pages from our websites;</li>
                                  <li>
                                    stream audio and video files from our
                                    websites; and
                                  </li>
                                  <li>
                                    use our website services by means of a web
                                    browser, subject to the other provisions of
                                    these terms and conditions.
                                  </li>
                                </ol>
                              </li>
                              <li>
                                Except as expressly permitted by Section 3.1 or
                                the other provisions of these terms and
                                conditions, you must not download any material
                                from our websites or save any such material to
                                your computer.
                              </li>
                              <li>
                                You may only use our websites for your own
                                personal and business purposes, and you must not
                                use our websites for any other purposes.
                              </li>
                              <li>
                                Except as expressly permitted by these terms and
                                conditions, you must not edit or otherwise
                                modify any material on our websites.
                              </li>
                              <li>
                                Unless you own or control the relevant rights in
                                the material, you must not:
                                <ol className="terms-inner-list">
                                  <li>
                                    republish material from our websites
                                    (including republication on another
                                    websites);
                                  </li>
                                  <li>
                                    sell, rent or sub-license material from our
                                    websites;
                                  </li>
                                  <li>
                                    show any material from our websites in
                                    public;
                                  </li>
                                  <li>
                                    exploit material from our websites for a
                                    commercial purpose; or
                                  </li>
                                  <li>
                                    redistribute material from our websites.
                                  </li>
                                </ol>
                              </li>
                              <li>
                                We reserve the right to restrict access to areas
                                of our websites, or indeed our whole website, at
                                our discretion; you must not circumvent or
                                bypass, or attempt to circumvent or bypass, any
                                access restriction measures on our websites.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Acceptable Use
                            </p>
                            <ol className="terms-list">
                              <li>
                                You must not:
                                <ol className="terms-inner-list">
                                  <li>
                                    use our websites in any way or take any
                                    action that causes, or may cause, damage to
                                    the websites or impairment of the
                                    performance, availability or accessibility
                                    of the websites;
                                  </li>
                                  <li>
                                    use our websites in any way that is
                                    unlawful, illegal, fraudulent or harmful, or
                                    in connection with any unlawful, illegal,
                                    fraudulent or harmful purpose or activity;
                                  </li>
                                  <li>
                                    use our websites to copy, store, host,
                                    transmit, send, use, publish or distribute
                                    any material which consists of (or is linked
                                    to) any spyware, computer virus, Trojan
                                    horse, worm, keystroke logger, rootkit or
                                    other malicious computer software;
                                  </li>
                                  <li>
                                    conduct any systematic or automated data
                                    collection activities (including without
                                    limitation scraping, data mining, data
                                    extraction and data harvesting) on or in
                                    relation to our websites without our express
                                    written consent;
                                  </li>
                                  <li>
                                    access or otherwise interact with our
                                    websites using any robot, spider or other
                                    automated means, except for the purpose of
                                    search engine indexing;
                                  </li>
                                  <li>
                                    violate the directives set out in the
                                    robots.txt file for our websites; or
                                  </li>
                                  <li>
                                    use data collected from our websites for any
                                    direct marketing activity (including without
                                    limitation email marketing, SMS marketing,
                                    telemarketing and direct mailing).
                                  </li>
                                </ol>
                              </li>
                              <li>
                                You must not use data collected from our
                                websites to contact individuals, companies or
                                other persons or entities.
                              </li>
                              <li>
                                You must ensure that all the information you
                                supply to us through our websites, or in
                                relation to our websites, is true, accurate,
                                current, complete and non-misleading.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Use On Behalf of Organization
                            </p>
                            <ol className="terms-list">
                              <li>
                                If you use our websites or expressly agree to
                                these terms and conditions in the course of a
                                business or other organizational project, then
                                by so doing you bind both:
                                <ol className="terms-inner-list">
                                  <li>yourself; and</li>
                                  <li>
                                    the person, company or other legal entity
                                    that operates that business or
                                    organizational project, to these terms and
                                    conditions, and in these circumstances
                                    references to “you” in these terms and
                                    conditions are to both the individual user
                                    and the relevant person, company or legal
                                    entity, unless the context requires
                                    otherwise.
                                  </li>
                                </ol>
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Registration and Accounts
                            </p>
                            <ol className="terms-list">
                              <li>
                                You may register for an account with our
                                websites by completing and submitting the
                                account registration form on our websites, and
                                clicking on the verification link in the email
                                that the website will send to you.
                              </li>
                              <li>
                                You must not allow any other person to use your
                                account to access the websites.
                              </li>
                              <li>
                                You must notify us in writing immediately if you
                                become aware of any unauthorized use of your
                                account.
                              </li>
                              <li>
                                You must not use any other person’s account to
                                access the websites.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              User Login Details
                            </p>
                            <ol className="terms-list">
                              <li>
                                If you register for an account with our
                                websites, we will provide you with a user ID and
                                password.
                              </li>
                              <li>
                                Your user ID must not be liable to mislead and
                                must comply with the content rules set out in
                                Section 12; you must not use your account or
                                user ID for or in connection with the
                                impersonation of any person.
                              </li>
                              <li>You must keep your password confidential.</li>
                              <li>
                                You must notify us in writing immediately if you
                                become aware of any disclosure of your password.
                              </li>
                              <li>
                                You are responsible for any activity on our
                                website arising out of any failure to keep your
                                password confidential, and may be held liable
                                for any losses arising out of such a failure.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Cancellation and Suspension of Account
                            </p>
                            <ol className="terms-list">
                              <li>
                                We may:
                                <ol className="terms-inner-list">
                                  <li>yourself; and</li>
                                  <li>suspend your account;</li>
                                  <li>cancel your account; and/or</li>
                                  <li>
                                    edit your account details, at any time in
                                    our sole discretion without notice or
                                    explanation, providing that if we cancel any
                                    services you have paid for and you have not
                                    breached these terms and conditions, we will
                                    refund to you a pro rata amount of your
                                    payment, such amount to be calculated by us
                                    using any reasonable methodology.
                                  </li>
                                </ol>
                              </li>
                              <li>
                                You may cancel your account on our websites
                                using your account control panel on the websites
                                or by notifying us. You will not be entitled to
                                any refund if you cancel your account in
                                accordance with this Section 8.2.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Subscriptions
                            </p>
                            <ol className="terms-list">
                              <li>
                                For so long as your account and subscription
                                remain active in accordance with these terms and
                                conditions, you will benefit from the features
                                specified on our website in relation to your
                                subscription type.
                              </li>
                              <li>
                                We may from time to time vary the benefits
                                associated with a subscription by giving you
                                written notice of the variation, providing that,
                                if in our reasonable opinion such a variation
                                results in a substantial loss of value or
                                functionality, you shall have the right to
                                cancel your account, and we will refund to you
                                any amounts paid to us in respect of any period
                                that was unused.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Fees
                            </p>
                            <ol className="terms-list">
                              <li>
                                The fees in respect of our website services will
                                be as set out on the website from time to time.
                              </li>
                              <li>
                                All amounts stated in these terms and conditions
                                or on our websites are stated exclusive of VAT.
                              </li>
                              <li>
                                You must pay to us the fees in respect of our
                                website services in advance, in cleared funds,
                                in accordance with any instructions on our
                                websites.
                              </li>
                              <li>
                                We may vary fees from time to time by posting
                                new fees on our websites, but this will not
                                affect fees for services that have been
                                previously paid.
                              </li>
                              <li>
                                If you dispute any payment made to us, you must
                                contact us immediately and provide full details
                                of your claim.
                              </li>
                              <li>
                                If you make an unjustified credit card, debit
                                card or other charge-back then you will be
                                liable to pay us, within 7 days following the
                                date of our written request:
                                <ol className="terms-inner-list">
                                  <li>
                                    an amount equal to the amount of the
                                    charge-back;
                                  </li>
                                  <li>
                                    all third party expenses incurred by us in
                                    relation to the charge-back (including
                                    charges made by our or your bank or payment
                                    processor or card issuer);
                                  </li>
                                  <li>
                                    an administration fee of $ 100.00 including
                                    VAT; and
                                  </li>
                                  <li>
                                    all our reasonable costs, losses and
                                    expenses incurred in recovering the amounts
                                    referred to in this Section 10.6 (including
                                    without limitation legal fees and debt
                                    collection fees), and for the avoidance of
                                    doubt, if you fail to recognize or fail to
                                    remember the source of an entry on your card
                                    statement or other financial statement, and
                                    make a charge-back as a result, this will
                                    constitute an unjustified charge-back for
                                    the purposes of this Section 10.6.
                                  </li>
                                </ol>
                              </li>
                              <li>
                                If you owe us any amount under or relating to
                                these terms and conditions, we may suspend or
                                withdraw the provision of services to you.
                              </li>
                              <li>
                                We may at any time set off any amount that you
                                owe to us against any amount that we owe to you,
                                by sending you written notice of the set-off.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Your Content: License
                            </p>
                            <ol className="terms-list">
                              <li>
                                In these terms and conditions, “your content”
                                means all works and materials (including without
                                limitation text, graphics, images, audio
                                material, video material, audio-visual material,
                                scripts, software and files) that you submit to
                                us or our websites for storage or publication
                                on, processing by, or transmission via, our
                                websites.
                              </li>
                              <li>
                                You grant to us a worldwide, irrevocable,
                                non-exclusive, royalty-free license to use,
                                reproduce, store, adapt, publish, translate and
                                distribute your content in any existing or
                                future media.
                              </li>
                              <li>
                                You grant to us the right to sub-license the
                                rights licensed under Section 11.2.
                              </li>
                              <li>
                                You grant to us the right to bring an action for
                                infringement of the rights licensed under
                                Section 11.2.
                              </li>
                              <li>
                                You hereby waive all your moral rights in your
                                content to the maximum extent permitted by
                                applicable law; and you warrant and represent
                                that all other moral rights in your content have
                                been waived to the maximum extent permitted by
                                applicable law.
                              </li>
                              <li>
                                You may edit your content to the extent
                                permitted using the editing functionality made
                                available on our websites.
                              </li>
                              <li>
                                That you may be penalized or prosecuted for
                                publishing contents that are malicious or
                                pornographic in nature through our website.
                              </li>
                              <li>
                                Without prejudice to our other rights under
                                these terms and conditions, if you breach any
                                provision of these terms and conditions in any
                                way, or if we reasonably suspect that you have
                                breached these terms and conditions in any way,
                                we may delete, unpublish or edit any or all of
                                your content.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Your content: rules
                            </p>
                            <ol className="terms-list">
                              <li>
                                You warrant and represent that your content will
                                comply with these terms and conditions.
                              </li>
                              <li>
                                Your content must not be illegal or unlawful,
                                must not infringe any person’s legal rights, and
                                must not be capable of giving rise to legal
                                action against any person (in each case in any
                                jurisdiction and under any applicable law).
                              </li>
                              <li>
                                Your content, and the use of your content by us
                                in accordance with these terms and conditions,
                                must not:
                                <ol className="terms-inner-list">
                                  <li>be libelous or maliciously false;</li>
                                  <li>be obscene or indecent;</li>
                                  <li>
                                    infringe any copyright, moral right,
                                    database right, trade mark right, design
                                    right, right in passing off, or other
                                    intellectual property right;
                                  </li>
                                  <li>
                                    infringe any right of confidence, right of
                                    privacy or right under data protection
                                    legislation;
                                  </li>
                                  <li>
                                    constitute negligent advice or contain any
                                    negligent statement;
                                  </li>
                                  <li>
                                    constitute an incitement to commit a crime,
                                    instructions for the commission of a crime
                                    or the promotion of criminal activity;
                                  </li>
                                  <li>
                                    be in contempt of any court, or in breach of
                                    any court order;
                                  </li>
                                  <li>
                                    be in breach of racial or religious hatred
                                    or discrimination legislation;
                                  </li>
                                  <li>be blasphemous;</li>
                                  <li>
                                    be in breach of official secrets
                                    legislation;
                                  </li>
                                  <li>
                                    be in breach of any contractual obligation
                                    owed to any person;
                                  </li>
                                  <li>
                                    depict violence in an explicit, graphic or
                                    gratuitous manner;
                                  </li>
                                  <li>
                                    be pornographic, lewd, suggestive or
                                    sexually explicit;
                                  </li>
                                  <li>
                                    be untrue, false, inaccurate or misleading;
                                  </li>
                                  <li>
                                    consist of or contain any instructions,
                                    advice or other information which may be
                                    acted upon and could, if acted upon, cause
                                    illness, injury or death, or any other loss
                                    or damage;
                                  </li>
                                  <li>constitute spam;</li>
                                  <li>
                                    be offensive, deceptive, fraudulent,
                                    threatening, abusive, harassing,
                                    anti-social, menacing, hateful,
                                    discriminatory or inflammatory; or
                                  </li>
                                  <li>
                                    cause annoyance, inconvenience or needless
                                    anxiety to any person.
                                  </li>
                                </ol>
                              </li>
                              {/* <li>
                                If you owe us any amount under or relating to
                                these terms and conditions, we may suspend or
                                withdraw the provision of services to you.
                              </li>
                              <li>
                                We may at any time set off any amount that you
                                owe to us against any amount that we owe to you,
                                by sending you written notice of the set-off.
                              </li> */}
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Report Abuse
                            </p>
                            <ol className="terms-list">
                              <li>
                                If you learn of any unlawful material or
                                activity on our websites, or any material or
                                activity that breaches these terms and
                                conditions, please let us know.
                              </li>
                              <li>
                                You can let us know about any such material or
                                activity by email.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Limited Warranties
                            </p>
                            <ol className="terms-list">
                              <li>
                                We do not warrant or represent:
                                <ol className="terms-inner-list">
                                  <li>
                                    the completeness or accuracy of the
                                    information published on our websites;
                                  </li>
                                  <li>
                                    that the material on the websites is up to
                                    date; or
                                  </li>
                                  <li>
                                    that the websites or any service on the
                                    websites will remain available.
                                  </li>
                                </ol>
                              </li>
                              <li>
                                We reserve the right to discontinue or alter any
                                or all of our website services, and to stop
                                publishing our websites, at any time in our sole
                                discretion without notice or explanation; and
                                save to the extent expressly provided otherwise
                                in these terms and conditions, you will not be
                                entitled to any compensation or other payment
                                upon the discontinuance or alteration of any
                                website services, or if we stop publishing the
                                websites.
                              </li>
                              <li>
                                To the maximum extent permitted by applicable
                                law and subject to Section 15.1, we exclude all
                                representations and warranties relating to the
                                subject matter of these terms and conditions,
                                our websites and the use of our websites.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Limitations and Exclusions of Liability
                            </p>
                            <ol className="terms-list">
                              <li>
                                Nothing in these terms and conditions will:
                                <ol className="terms-inner-list">
                                  <li>
                                    limit or exclude any liability for death or
                                    personal injury resulting from negligence;
                                  </li>
                                  <li>
                                    limit or exclude any liability for fraud or
                                    fraudulent misrepresentation;
                                  </li>
                                  <li>
                                    limit any liabilities in any way that is not
                                    permitted under applicable law; or
                                  </li>
                                  <li>
                                    exclude any liabilities that may not be
                                    excluded under applicable law.
                                  </li>
                                </ol>
                              </li>
                              <li>
                                The limitations and exclusions of liability set
                                out in this Section 15 and elsewhere in these
                                terms and conditions:
                                <ol className="terms-inner-list">
                                  <li>are subject to Section 15.1; and</li>
                                  <li>
                                    govern all liabilities arising under these
                                    terms and conditions or relating to the
                                    subject matter of these terms and
                                    conditions, including liabilities arising in
                                    contract, in tort (including negligence) and
                                    for breach of statutory duty, except to the
                                    extent expressly provided otherwise in these
                                    terms and conditions.
                                  </li>
                                </ol>
                              </li>
                              <li>
                                To the extent that our websites and the
                                information and services on our websites are
                                provided free of charge, we will not be liable
                                for any loss or damage of any nature.
                              </li>
                              <li>
                                We will not be liable to you in respect of any
                                losses arising out of any event or events beyond
                                our reasonable control.
                              </li>
                              <li>
                                We will not be liable to you in respect of any
                                business losses, including (without limitation)
                                loss of or damage to profits, income, revenue,
                                use, production, anticipated savings, business,
                                contracts, commercial opportunities or goodwill.
                              </li>
                              <li>
                                We will not be liable to you in respect of any
                                loss or corruption of any data, database or
                                software.
                              </li>
                              <li>
                                We will not be liable to you in respect of any
                                special, indirect or consequential loss or
                                damage.
                              </li>
                              <li>
                                You accept that we have an interest in limiting
                                the personal liability of our officers and
                                employees and, having regard to that interest,
                                you acknowledge that we are a limited liability
                                entity; you agree that you will not bring any
                                claim personally against our officers or
                                employees in respect of any losses you suffer in
                                connection with the websites or these terms and
                                conditions (this will not, of course, limit or
                                exclude the liability of the limited liability
                                entity itself for the acts and omissions of our
                                officers and employees).
                              </li>
                              <li>
                                Our aggregate liability to you in respect of any
                                contract to provide services to you under these
                                terms and conditions shall not exceed the
                                greater of:
                                <ol className="terms-inner-list">
                                  <li>$100 including VAT; and</li>
                                  <li>
                                    the total amount paid and payable to us
                                    under the contract.
                                  </li>
                                </ol>
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Indemnity
                            </p>
                            <ol className="terms-list">
                              <li>
                                You hereby indemnify us, and undertake to keep
                                us indemnified, against any and all losses,
                                damages, costs, liabilities and expenses
                                (including without limitation legal expenses and
                                any amounts paid by us to a third party in
                                settlement of a claim or dispute) incurred or
                                suffered by us and arising directly or
                                indirectly out of your use of our website or any
                                breach by you of any provision of these terms
                                and conditions.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Breaches of these terms and conditions
                            </p>
                            <ol className="terms-list">
                              <li>
                                Without prejudice to our other rights under
                                these terms and conditions, if you breach these
                                terms and conditions in any way, or if we
                                reasonably suspect that you have breached these
                                terms and conditions in any way, we may:
                                <ol className="terms-inner-list">
                                  <li>send you one or more formal warnings;</li>
                                  <li>
                                    temporarily suspend your access to our
                                    websites;
                                  </li>
                                  <li>
                                    permanently prohibit you from accessing our
                                    websites;
                                  </li>
                                  <li>
                                    block computers using your IP address from
                                    accessing our websites;
                                  </li>
                                  <li>
                                    contact any or all of your internet service
                                    providers and request that they block your
                                    access to our websites;
                                  </li>
                                  <li>
                                    commence legal action against you, whether
                                    for breach of contract or otherwise; and/or
                                  </li>
                                  <li>
                                    suspend or delete your account on our
                                    websites.
                                  </li>
                                </ol>
                              </li>
                              <li>
                                Where we suspend or prohibit or block your
                                access to our websites or a part of our
                                websites, you must not take any action to
                                circumvent such suspension or prohibition or
                                blocking (including without limitation creating
                                and/or using a different account).
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Third Party Websites
                            </p>
                            <ol className="terms-list">
                              <li>
                                Our websites includes hyperlinks to other
                                websites owned and operated by third parties;
                                such hyperlinks are not recommendations.
                              </li>
                              <li>
                                We have no control over third party websites and
                                their contents, and subject to Section 15.1 we
                                accept no responsibility for them or for any
                                loss or damage that may arise from your use of
                                them.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Trade Marks
                            </p>
                            <ol className="terms-list">
                              <li>
                                Mysogi Ads, Mysogi Campaign Manager,Mysogi, all
                                our logos and our other registered and
                                unregistered trade marks are trade marks
                                belonging to us; we give no permission for the
                                use of these trade marks, and such use may
                                constitute an infringement of our rights.
                              </li>
                              <li>
                                The third party registered and unregistered
                                trade marks or service marks on our website are
                                the property of their respective owners and,
                                unless stated otherwise in these terms and
                                conditions, we do not endorse and are not
                                affiliated with any of the holders of any such
                                rights and as such we cannot grant any license
                                to exercise such rights.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Variation
                            </p>
                            <ol className="terms-list">
                              <li>
                                We may revise these terms and conditions from
                                time to time.
                              </li>
                              <li>
                                The revised terms and conditions shall apply to
                                the use of our website from the date of
                                publication of the revised terms and conditions
                                on the website, and you hereby waive any right
                                you may otherwise have to be notified of, or to
                                consent to, revisions of these terms and
                                conditions.
                              </li>
                              <li>
                                If you have given your express agreement to
                                these terms and conditions, we will ask for your
                                express agreement to any revision of these terms
                                and conditions; and if you do not give your
                                express agreement to the revised terms and
                                conditions within such period as we may specify,
                                we will disable or delete your account on the
                                website, and you must stop using the website.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Assignment
                            </p>
                            <ol className="terms-list">
                              <li>
                                You hereby agree that we may assign, transfer,
                                sub-contract or otherwise deal with our rights
                                and/or obligations under these terms and
                                conditions.
                              </li>
                              <li>
                                You may not without our prior written consent
                                assign, transfer, sub-contract or otherwise deal
                                with any of your rights and/or obligations under
                                these terms and conditions.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Severability
                            </p>
                            <ol className="terms-list">
                              <li>
                                If a provision of these terms and conditions is
                                determined by any court or other competent
                                authority to be unlawful and/or unenforceable,
                                the other provisions will continue in effect.
                              </li>
                              <li>
                                If any unlawful and/or unenforceable provision
                                of these terms and conditions would be lawful or
                                enforceable if part of it were deleted, that
                                part will be deemed to be deleted, and the rest
                                of the provision will continue in effect.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Third Party Rights
                            </p>
                            <ol className="terms-list">
                              <li>
                                A contract under these terms and conditions is
                                for our benefit and your benefit, and is not
                                intended to benefit or be enforceable by any
                                third party.
                              </li>
                              <li>
                                The exercise of the parties’ rights under a
                                contract under these terms and conditions is not
                                subject to the consent of any third party.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Entire Agreement
                            </p>
                            <ol className="terms-list">
                              <li>
                                Subject to Section 15.1, these terms and
                                conditions, together with our privacy and
                                cookies policy, shall constitute the entire
                                agreement between you and us in relation to your
                                use of our websites and shall supersede all
                                previous agreements between you and us in
                                relation to your use of our websites.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Law and Jurisdiction
                            </p>
                            <ol className="terms-list">
                              <li>
                                These terms and conditions shall be governed by
                                and construed in accordance with Nigerian laws.
                              </li>
                              <li>
                                Any disputes relating to these terms and
                                conditions shall be subject to the exclusive
                                jurisdiction of the courts of Nigeria.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Statutory and Regulatory Disclosures
                            </p>
                            <ol className="terms-list">
                              <li>
                                We will not file a copy of these terms and
                                conditions specifically in relation to each user
                                or customer and, if we update these terms and
                                conditions, the version to which you originally
                                agreed will no longer be available on our
                                websites. We recommend that you consider saving
                                a copy of these terms and conditions for future
                                reference.
                              </li>
                              <li>
                                These terms and conditions are available in the
                                English language only.
                              </li>
                            </ol>
                          </li>
                          <li className="mg-t-20">
                            <p className="tx-20 tx-com tx-left tx-bold mb-0">
                              Our Details
                            </p>
                            <ol className="terms-list">
                              <li>
                                This website is owned and operated by Mysogi
                                Company Limited.
                              </li>
                              <li>
                                We are registered in Nigeria under registration
                                number RC 1422746, and our registered office is
                                at 111 Igbogbo road , Ikorodu, Lagos
                              </li>
                              <li>
                                Our principal place of business is at 3 Adedoyin
                                Ogungbe Crescent, Lekki phase 1, Lekki, Lagos
                              </li>
                              <li>
                                You can contact us:
                                <ol className="terms-inner-list">
                                  <li>using our website contact form;</li>
                                  <li>
                                    by telephone, on the contact number
                                    published on our website from time to time;
                                    or
                                  </li>
                                  <li>
                                    by email, using the email address published
                                    on our website from time to time.
                                  </li>
                                </ol>
                              </li>
                            </ol>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-11 mx-auto pd-lg-t-70 pd-t-30">
                  <div className="tx-center">
                    <p className="tx-28 tx-com tx-bold mb-2">
                      Get your audience’s attention
                    </p>
                    <p className="tx-18 ">
                      Let’s help secure the right audience with our options
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mg-t-20">
                      <div className="card-height">
                        <img
                          src="./assets/img/High_Visual_Display_Ads.svg"
                          className="img-fluid "
                          data-aos="fade-up"
                          data-aos-duration={2000}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mg-t-20 pd-md-b-100">
                      <div className=" card-height vert-container">
                        <div
                          className="vert-center animate__slower"
                          data-aos="fade-down"
                          data-aos-duration={2000}
                        >
                          <p className="tx-28 tx-bold tx-com">
                            High Visual Display Ads
                          </p>
                          <p className="tx-18 tx-blac mg-b-80">
                            Capture attention with eye striking visuals and
                            reach highly engaged users with prominent ad spots
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* <section className="bg-reddish">
                <div className="container">
                  <div className="col-xl-11 mx-auto">
                    <div>
                      <div className="row">
                        <div className="col-md-6 order-2 order-md-1 mg-t-20">
                          <div className=" card-height vert-container">
                            <div
                              className="vert-center"
                              data-aos="fade-left"
                              data-aos-duration={2000}
                            >
                              <p className="tx-28 tx-bold tx-com">
                                Phone Call Ads
                              </p>
                              <p className="tx-18 tx-blac">
                                Promote your brand on calls and enhance recall,
                                especially in media dark region
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 order-1 order-md-2 mg-t-20">
                          <div className="card-height">
                            <img
                              src="./assets/img/Call_Ads.svg"
                              className="img-fluid img-negg"
                              data-aos="fade-right"
                              data-aos-duration={2000}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className>
                <div className="container pb-md-5">
                  <div className="col-xl-11 mx-auto">
                    <div className="row">
                      <div className="col-md-6 mg-t-20">
                        <div className="card-height">
                          <img
                            src="./assets/img/SMS_Ads.svg"
                            className="img-fluid img-neg"
                            data-aos="fade-left"
                            data-aos-duration={2000}
                            alt=""
                            srcSet
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mg-t-20">
                        <div className=" card-height vert-container">
                          <div
                            className="vert-center"
                            data-aos="fade-right"
                            data-aos-duration={2000}
                          >
                            <p className="tx-28 tx-bold tx-com">
                              One to One SMS
                            </p>
                            <p className="tx-18 tx-blac">
                              Deliver information with a high success rate and
                              support your digital marketing efforts
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-reddish">
                <div className="container py-1">
                  <div className="mg-md-t-40 mg-t-30">
                    <p className="tx-36 tx-bold mb-2 tx-com ">Let's discuss</p>
                    <p className="tx-20">
                      I am a <span className="tx-primary tx-medium">brand</span>{" "}
                      looking to{" "}
                      <span className="tx-primary tx-medium">
                        build awareness
                      </span>
                    </p>
                    <div className="row pos-rel">
                      <div className="col-md-11 mg-t-20 order-2 ">
                        <div className="card bd-0 shadow">
                          <div className="card-body pd-lg-60">
                            <form onSubmit={submitEmail}>
                              <div className="form-row">
                                <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Your Name
                                  </label>
                                  <input
                                    name="name"
                                    type="text"
                                    className="form-control contact"
                                    id="inputEmail4"
                                    placeholder="Enter Name"
                                    onChange={handleStateChange}
                                    value={name}
                                  />
                                </div>
                                <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Phone Number
                                  </label>
                                  <input
                                    name="phone"
                                    type="text"
                                    className="form-control contact"
                                    placeholder="Enter Number"
                                    onChange={handleStateChange}
                                    value={phone}
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Email Address
                                  </label>
                                  <input
                                    name="email"
                                    type="email"
                                    className="form-control contact"
                                    id="inputEmail4"
                                    placeholder="Enter Email Address"
                                    onChange={handleStateChange}
                                    value={email}
                                  />
                                </div>
                                <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Company Name
                                  </label>
                                  <input
                                    name="company"
                                    type="text"
                                    className="form-control contact"
                                    placeholder="Enter Company Name"
                                    onChange={handleStateChange}
                                    value={company}
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Designation
                                  </label>
                                  <input
                                    name="designation"
                                    type="text"
                                    className="form-control contact"
                                    placeholder="Enter Designation"
                                    onChange={handleStateChange}
                                    value={designation}
                                  />
                                </div>
                                <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Industry
                                  </label>
                                  <input
                                    name="industry"
                                    type="text"
                                    className="form-control contact"
                                    id="inputEmail4"
                                    placeholder="Enter Industry"
                                    onChange={handleStateChange}
                                    value={industry}
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Employee Count
                                  </label>
                                  <input
                                    name="employee"
                                    type="text"
                                    className="form-control contact"
                                    placeholder="Enter Number"
                                    onChange={handleStateChange}
                                    value={employee}
                                  />
                                </div>
                                <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    City
                                  </label>
                                  <input
                                    name="city"
                                    type="text"
                                    className="form-control contact"
                                    placeholder="Enter City"
                                    onChange={handleStateChange}
                                    value={city}
                                  />
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-primary pd-x-40 mg-t-20"
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className=" mg-t-20 pd-md-t-40 order-1 order-md-2 pd-md-x-0 mar-left">
                        <img
                          src="./assets/img/woman_smiling.png"
                          className="img-fluid"
                          data-aos="fade-down"
                          data-aos-duration={3000}
                          alt=""
                          srcSet
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section id="campaign" className="camp-top">
                <div className>
                  <div className="container bg-black">
                    <div className>
                      <div className="row">
                        <div className="col-md-6 mg-t-20">
                          <div className>
                            <img
                              src="./assets/img/mysogi_phone.png"
                              className="img-fluid img-neg-camp"
                              data-aos="fade-left"
                              data-aos-duration={2000}
                              alt=""
                              srcSet
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mg-t-20">
                          <div className=" card-height text-white">
                            <div className="vert-center">
                              <p className="tx-16 text-white">
                                Ready to hit the digital market?
                              </p>
                              <p className="tx-26 tx-com fw-bold">
                                Get started with Mysogi
                              </p>
                              <Link
                                to="register"
                                type="button"
                                className="btn btn-primary pd-x-40 mg-t-20"
                              >
                                Sign Up
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section> */}
            </section>
            {/* <Footer /> */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
