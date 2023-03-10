import { api } from "@/services/api";
import { getStripeJs } from "@/services/stripe-js";
import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();
  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return;
    }

    try {
      const response = await api.post('/subscribe');
      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout({ sessionId: response.data.sessionId })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
      Subscribe now
    </button>
  )
}