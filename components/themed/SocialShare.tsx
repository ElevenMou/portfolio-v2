"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useTranslations } from "next-intl";
import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import { usePathname } from "next/navigation";
import { memo, useEffect, useState } from "react";

export default memo(function SocialShare() {
  const path = usePathname();
  const [link, setLink] = useState<string>(
    `https://www.moussasaidi.com${path}`
  );
  const tblog = useTranslations("Blog");

  const analyticsEvent = () => {
    sendGTMEvent({
      dataLayer: {
        event: "share",
        path: path,
      },
      eventAction: "share",
      eventCategory: "social",
    });
  };

  useEffect(() => {
    setLink(`https://www.moussasaidi.com${path}`);
  }, [path]);

  return (
    <div className="social-share">
      <h2 className="margin-bottom-s">{tblog("Share")}</h2>
      <div className="social-share__links">
        <LinkedinShareButton url={link} onClick={analyticsEvent}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <FacebookShareButton url={link} onClick={analyticsEvent}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={link} onClick={analyticsEvent}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <RedditShareButton url={link} onClick={analyticsEvent}>
          <RedditIcon size={32} round />
        </RedditShareButton>
        <WhatsappShareButton url={link} onClick={analyticsEvent}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TelegramShareButton url={link} onClick={analyticsEvent}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>
    </div>
  );
});
