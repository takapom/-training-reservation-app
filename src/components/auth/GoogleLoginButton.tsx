import {auth, googleProvider} from "@/lib/firebase"
import { signInWithPopup } from "firebase/auth"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"
import Image from "next/image"

export default function GoogleLoginButton(){
    const router = useRouter();

    const handleGoogleLogin = async () => {
        try{
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("ログインできた！", user);

            router.push("/mypage");
        } catch(error){
            console.log("ログイン失敗したよ", error);
        }
    };

    return(
        <div>
        <button type="button" className={styles.googleButton} onClick={handleGoogleLogin}>
            <div className={styles.googleIconWrapper}>
              <Image
                src="/placeholder.svg?height=18&width=18"
                alt="Google"
                width={18}
                height={18}
                className={styles.googleIcon}
              />
            </div>
            <span className={styles.googleButtonText}>Googleでログイン</span>
          </button>
        </div>
    )
}