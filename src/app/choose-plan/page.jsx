"use client";
import pricing from "../../../assets/pricing__top.png";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import styles from "./page.module.css";
import { FaBookOpen, FaHandshake } from "react-icons/fa";
import { RiPlantFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";

export default function PricingPage() {
  const [user, setUser] = useState(null);
  const [premiumPlan, setPremiumPlan] = useState(false);
  const [platinumPlan, setPlatinumPlan] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.plan__header__wrapper}>
        <div className={styles.plan__header}>
          <div className={styles.plan__title}>
            Get unlimited access to amazing books to read!
          </div>
          <div className={styles.plan__subtitle}>
            Turn ordinary moments into opportunities to learn.
          </div>
          <figure className={styles.plan__img__wrapper}>
            <Image className={styles.plan__img} src={pricing} alt="Pricing" />
          </figure>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles.plan__features__wrapper}>
            <div className={styles.plan__features}>
              <figure className={styles.plan__feature__icon}>
                <FaBookOpen className={styles.icon} />
              </figure>
              <div className={styles.features__text}>
                <b>Key ideas</b> to browse in hundreds of books.
              </div>
            </div>
            <div className={styles.plan__features}>
              <div className={styles.plan__features}>
                <figure className={styles.plan__feature__icon}>
                  <RiPlantFill className={styles.icon} />
                </figure>
                <div className={styles.features__text}>
                  <b>3 million</b> people are growing with Summarist everyday.
                </div>
              </div>
            </div>
            <div className={styles.plan__features}>
              <div className={styles.plan__features}>
                <figure className={styles.plan__feature__icon}>
                  <FaHandshake className={styles.icon} />
                </figure>
                <div className={styles.features__text}>
                  <b>Precise recommendations</b> curated by what <b>you</b> want
                  to read.
                </div>
              </div>
            </div>
          </div>
          <div className={styles.sectiontitle}>
            Choose the plan that best fits you
          </div>
          <button
            className={styles.choose__plan__btn}
            onClick={() => {
              setPlatinumPlan(false), setPremiumPlan(true);
            }}
          >
            {premiumPlan ? (
              <div
                className={`${styles.plan__card__active} ${styles.plan__card}`}
              >
                <div className={styles.plan__circle}>
                  <div className={styles.plan__card__dot}></div>
                </div>
                <div className={styles.plan__content__wrapper}>
                  <div className={styles.plan__content__title}>
                    Premium Yearly Subscription
                  </div>
                  <div className={styles.plan__content__price}>$59.99/year</div>
                  <div className={styles.plan__content__text}>
                    first month free for first time subscribers!
                  </div>
                </div>
              </div>
            ) : (
              <div className={` ${styles.plan__card}`}>
                <div className={styles.plan__circle}></div>
                <div className={styles.plan__content__wrapper}>
                  <div className={styles.plan__content__title}>
                    Premium Yearly Subscription
                  </div>
                  <div className={styles.plan__content__price}>$59.99/year</div>
                  <div className={styles.plan__content__text}>
                    first month free for first time subscribers!
                  </div>
                </div>
              </div>
            )}
          </button>
          <div className={styles.plan__card__seperator}>
            <div className={styles.plan__seperator}>or</div>
          </div>
          <button
            className={styles.choose__plan__btn}
            onClick={() => {
              setPlatinumPlan(true), setPremiumPlan(false);
            }}
          >
            {platinumPlan ? (
              <div
                className={`${styles.plan__card__active} ${styles.plan__card}`}
              >
                <div className={styles.plan__circle}>
                  <div className={styles.plan__card__dot}></div>
                </div>
                <div className={styles.plan__content__wrapper}>
                  <div className={styles.plan__content__title}>
                    Platinum Monthly Subscription
                  </div>
                  <div className={styles.plan__content__price}>$6.99/month</div>
                  <div className={styles.plan__content__text}>
                    try a 7 day free trial!
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${styles.plan__card}`}>
                <div className={styles.plan__circle}></div>
                <div className={styles.plan__content__wrapper}>
                  <div className={styles.plan__content__title}>
                    Platinum Monthly Subscription
                  </div>
                  <div className={styles.plan__content__price}>$6.99/month</div>
                  <div className={styles.plan__content__text}>
                    try a 7 day free trial!
                  </div>
                </div>
              </div>
            )}
          </button>
          <div className={styles.plan__card__cta}>
            <span className={styles.btn__wrapper}>
              {premiumPlan ? (
                <button className={styles.btn}>
                  <Link
                    href={{
                      pathname: "/payment",
                      query: { plan: "premium", price: "59.99" },
                    }}
                  >
                    Claim your first month
                  </Link>
                </button>
              ) : (
                <button className={styles.btn}>
                  <Link
                    href={{
                      pathname: "/payment",
                      query: { plan: "platinum", price: "6.99" },
                    }}
                  >
                    Start your free trial
                  </Link>
                </button>
              )}
            </span>
            <div className={styles.disclaimer}>
              *Summarist has a 30-day money back guarantee, no questions asked.
            </div>
          </div>
          <div className={styles.plan__faq__wrapper}>
            <div
              onClick={() => toggleAccordion(0)}
              className={styles.plan__faq__accordion}
            >
              <div className={styles.plan__faq__header}>
                <div className={styles.accordion__title}>
                  How does the free trial work?
                </div>
                <IoIosArrowDown
                  className={`${styles.accordion__icon} ${
                    activeIndex === 0 ? styles.rotate : ""
                  }`}
                />
              </div>
              <div
                className={`${styles.plan__faq__collapse} ${
                  activeIndex === 0 ? styles.show : ""
                }`}
              >
                <div className={styles.accordion__body}>
                  Begin your complimentary 7-day trial with a Summarist annual
                  membership. You are under no obligation to continue your
                  subscription, and you will only be billed when the trial
                  period expires. With Premium access, you can learn at your own
                  pace and as frequently as you desire, and you may terminate
                  your subscription prior to the conclusion of the 7-day free
                  trial.
                </div>
              </div>
            </div>
            <div
              onClick={() => toggleAccordion(1)}
              className={styles.plan__faq__accordion}
            >
              <div className={styles.plan__faq__header}>
                <div className={styles.accordion__title}>
                  Can I switch from the Platinum Plan to the Premium Plan?
                </div>
                <IoIosArrowDown
                  className={`${styles.accordion__icon} ${
                    activeIndex === 1 ? styles.rotate : ""
                  }`}
                />
              </div>
              <div
                className={`${styles.plan__faq__collapse} ${
                  activeIndex === 1 ? styles.show : ""
                }`}
              >
                {" "}
                <div className={styles.accordion__body}>
                  Switching from Platinum to Premium is easy! You can sign up
                  for a yearly subscription at any point, you will be billed for
                  the Premium Plan when the month of your Platinum plan ceases.
                  Go to your settings upon logging in for more info on your
                  subscription plan.
                </div>
              </div>
            </div>
            <div
              onClick={() => toggleAccordion(2)}
              className={styles.plan__faq__accordion}
            >
              <div className={styles.plan__faq__header}>
                <div className={styles.accordion__title}>
                  What is included in a membership?
                </div>
                <IoIosArrowDown
                  className={`${styles.accordion__icon} ${
                    activeIndex === 2 ? styles.rotate : ""
                  }`}
                />
              </div>
              <div
                className={`${styles.plan__faq__collapse} ${
                  activeIndex === 2 ? styles.show : ""
                }`}
              >
                {" "}
                <div className={styles.accordion__body}>
                  Premium membership provides you with the ultimate Summarist
                  experience, including unrestricted entry to many best-selling
                  books high-quality audio, the ability to download titles for
                  offline reading, and the option to send your reads to your
                  Kindle.
                </div>
              </div>
            </div>
            <div
              onClick={() => toggleAccordion(3)}
              className={styles.plan__faq__accordion}
            >
              <div className={styles.plan__faq__header}>
                <div className={styles.accordion__title}>
                  When can I cancel my trial or subscription?
                </div>
                <IoIosArrowDown
                  className={`${styles.accordion__icon} ${
                    activeIndex === 3 ? styles.rotate : ""
                  }`}
                />
              </div>
              <div
                className={`${styles.plan__faq__collapse} ${
                  activeIndex === 3 ? styles.show : ""
                }`}
              >
                {" "}
                <div className={styles.accordion__body}>
                  You will not be charged if you cancel your trial before its
                  conclusion. While you will not have complete access to the
                  entire Summarist library, you can still expand your knowledge
                  with one curated book per day.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
