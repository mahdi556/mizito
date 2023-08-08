import styles from "@/components/chat/Chat.module.css";
import Image from "next/image";

const Chat = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.rightCol}></div>
          <div className={styles.leftCol}>
            <div className={styles.headerLeft}>
              <div className={` my-2 ms-2  ${styles.avatarName}`}>زق</div>
              <div className="d-flex flex-column ms-3">
                <h5 className={styles.userTitle}>زهره قربانی</h5>
                <span className={styles.lastSeen}>آخرین بازدید 2 ساعت قبل</span>
              </div>
            </div>
            <div className={styles.chatWrapper}>
                <div className="d-flex align-items-center">
                    
              <Image src="/images/seen.svg" className="mt-2" style={{ backgroundColor:'#00ACC1',
               width:20,
               height:20,
               minWidth:20,
               maxWidth:20,
               borderRadius:'50%'
               }} height={15} width={15} />
              <div className={`mx-2 ${styles.bubbleRight}`}>
                <p>این پیام تست است.</p>
              </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
