import * as S from "styles/activities/components/session/index";
import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import AOS from "aos";
import SessionDev from "public/images/activities/session/session-development.png";
import SessionStartup from "public/images/activities/session/session-startup.png";
import SessionSpecial from "public/images/activities/session/session-special.png";
import "aos/dist/aos.css";
import { useRouter } from "next/router";

export default function Session() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const isDesktop = useMediaQuery({ minDeviceWidth: 820 });
  const isMobile = useMediaQuery({ maxWidth: 820 });
  useEffect(() => {
    AOS.init();
    if (isMobile != undefined && isDesktop != undefined) {
      setLoading(false);
    }
  }, []);
  return (
    <>
      {!loading && (
        <S.Container className="mount" isMobile={isMobile}>
          <S.MainContainer isMobile={isMobile}>
            <S.SessionWrapper isMobile={isMobile}>
              <S.SessionImgBox isMobile={isMobile}>
                <Image src={SessionDev} alt="개발 세션" layout="intrinsic" />
              </S.SessionImgBox>
              <S.SessionTitleBox isMobile={isMobile}>
                <p>개발 세션</p>
                <span />
                <p>매주 월, 목 7시 반 - 10시</p>
              </S.SessionTitleBox>
              <S.SessionInfoBox isMobile={isMobile}>
                HTML, CSS, Django, Python, Javascript, React.js 등 웹 개발에
                필요한 다양한 기술스택을 같이 공부합니다.
              </S.SessionInfoBox>
            </S.SessionWrapper>
            <S.SessionWrapper isMobile={isMobile}>
              <S.SessionImgBox isMobile={isMobile}>
                <Image
                  src={SessionStartup}
                  alt="개발 세션"
                  layout="intrinsic"
                />
              </S.SessionImgBox>
              <S.SessionTitleBox isMobile={isMobile}>
                <p>창업 세션</p>
                <span />
                <p>격주 토요일 3-6시</p>
              </S.SessionTitleBox>
              <S.SessionInfoBox isMobile={isMobile}>
                EO Planet에서 제공하는 초기 창업 교육 프로그램을 활용하여 서비스
                기획, 사업계획서 작성 등에 대해 공부합니다.
              </S.SessionInfoBox>
            </S.SessionWrapper>
            <S.SessionWrapper isMobile={isMobile}>
              <S.SessionImgBox isMobile={isMobile}>
                <Image
                  src={SessionSpecial}
                  alt="개발 세션"
                  layout="intrinsic"
                />
              </S.SessionImgBox>
              <S.SessionTitleBox isMobile={isMobile}>
                <p>스페셜 세션</p>
                <span />
                <p>비정기 진행</p>
              </S.SessionTitleBox>
              <S.SessionInfoBox isMobile={isMobile}>
                창업가, VC, 개발자 등 다양한 직군의 유명연사를 초청하여 현직자의
                이야기를 듣고, 네트워킹을 진행합니다.
              </S.SessionInfoBox>
            </S.SessionWrapper>
          </S.MainContainer>
        </S.Container>
      )}
    </>
  );
}
