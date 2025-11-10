"use client";
import { FaArrowLeft } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { Suspense, useState } from "react";

export default function Payment() {
  const handleCheckout = async () => {
    window.location.href = "/explore/for-you";
  };

  function PaymentContent() {
    const searchParams = useSearchParams();
    const plan = searchParams.get("plan") || "platinum";
    const price = searchParams.get("price") || "6.99";
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    return (
      <div className={styles.app}>
        <div className={styles.checkoutContainer}>
          <div className={styles.summary}>
            <div>
              <div className={styles.summaryHeader}>
                <Link href="/choose-plan">
                  <FaArrowLeft className={styles.arrow} />
                </Link>
                <i className={styles.test}>test mode</i>
              </div>

              <h2 className={styles.summaryTitle}>
                Summarist {plan === "premium" ? "Premium" : "Platinum"}
              </h2>
              <div className={styles.priceSection}>
                <div className={styles.header__price__title}>
                  Subscribe to Summarist{" "}
                  {plan === "premium" ? "Premium" : "Platinum"}
                </div>
                <div className={styles.price__info}>
                  <div className={styles.header__price}>${price}</div>
                  <div className={styles.header__price__time}>
                    per
                    <br />
                    {plan === "premium" ? "year" : "month"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.paymentForm}>
            <h3 className={styles.formTitle}>Payment Details</h3>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input
                className={styles.contact__input}
                type="email"
                placeholder="example@summarist.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Card Information</label>
              <div className={styles.cardElementWrapper}>
                <input
                  className={styles.contact__input}
                  placeholder="1234 1234 1234 1234"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Expiration Date</label>
              <input className={styles.contact__input} placeholder="MM / YY" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>CVC</label>
              <input className={styles.contact__input} placeholder="123" />
            </div>

            <button onClick={handleCheckout} className={styles.pay__button}>
              {loading ? "Redirecting..." : "Proceed to Home"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
