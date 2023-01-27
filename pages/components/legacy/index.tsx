import React, { useEffect, useState } from "react";
import { URLS } from "pages/constants/urls";
import * as S from "styles/components/header/style";
import LogoImg from "public/assets/logo.png";
import BlackLogoImg from "public/assets/likelionBlackLogo.png";
import { useMediaQuery } from "react-responsive";
import { MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import "antd/dist/reset.css";
import { useRouter } from "next/router";

const Links = [
  { name: "HOME", path: URLS.HOME },
  { name: "ABOUT US", path: URLS.ABOUT_US },
  { name: "ACTIVITIES", path: URLS.ACTIVITIES },
  { name: "JOIN US", path: URLS.JOIN_US },
];

const { SubMenu } = Menu;

const rootSubmenuKeys = ["sub1", "sub2"];

const NavBar = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setShouldRender(isOpen);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setShouldRender(false);
    }
  };

  const position = pathname === URLS.HOME ? "fixed" : null;
  const display = pathname === URLS.LANDING ? "none" : "flex";
  const logoSrc = pathname === URLS.HOME ? LogoImg : BlackLogoImg;

  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const goToHome = () => {
    router.push("/home");
    setIsOpen(false);
  };

  const goToPage = (pathname: string, item?: any) => {
    router.push({ pathname, state: { item } });
    // router.push(pathname);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <>
        <S.Container isOpen={isOpen}>
          <S.Header>
            <S.NavBarLogo
              src={LogoImg.src}
              onClick={goToHome}
              alt="NEXT 로고"
            />
            <MenuOutlined
              style={{ color: "#ffff", fontSize: "2.4rem" }}
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              className="trigger"
            />
          </S.Header>
          {shouldRender && (
            <S.MenuContainer
              isOpen={isOpen}
              onAnimationEnd={handleAnimationEnd}
            >
              <Menu
                theme="dark"
                mode="inline"
                onOpenChange={onOpenChange}
                openKeys={openKeys}
              >
                <Menu.Item key="0" onClick={goToHome}>
                  HOME
                </Menu.Item>
                <SubMenu key="sub1" title="ABOUT US">
                  <Menu.Item key="1" onClick={() => goToPage("/about-us", "1")}>
                    Introduction
                  </Menu.Item>
                  <Menu.Item key="2" onClick={() => goToPage("/about-us", "2")}>
                    History
                  </Menu.Item>
                  <Menu.Item key="3" onClick={() => goToPage("/about-us", "3")}>
                    Curriculum
                  </Menu.Item>
                  <Menu.Item key="4" onClick={() => goToPage("/about-us", "4")}>
                    Alumni
                  </Menu.Item>
                  <Menu.Item key="5" onClick={() => goToPage("/about-us", "5")}>
                    Achievement
                  </Menu.Item>
                  <Menu.Item key="6" onClick={() => goToPage("/about-us", "6")}>
                    Press Release
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title="ACTIVITIES">
                  <Menu.Item
                    key="7"
                    onClick={() => goToPage("/activities", "1")}
                  >
                    Session
                  </Menu.Item>
                  <Menu.Item
                    key="8"
                    onClick={() => goToPage("/activities", "2")}
                  >
                    Hackathon
                  </Menu.Item>
                  <Menu.Item
                    key="9"
                    onClick={() => goToPage("/activities", "3")}
                  >
                    Start-up
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="10" onClick={() => goToPage("/join-us")}>
                  JOIN US
                </Menu.Item>
                <S.NoticeContainer>
                  <p>ⓒ NEXT X Likelion</p>
                  <p>korea@likelion.org</p>

                  <p>korea university, Anam-dong, Seongbuk-gu,</p>
                  <p>Seoul, South Korea</p>
                </S.NoticeContainer>
              </Menu>
            </S.MenuContainer>
          )}
        </S.Container>
        <S.HeaderWhiteSpace />
      </>
    );
  }

  return (
    <S.NavBarContainer style={{ position, display }}>
      <S.NavBarLogo src={logoSrc.src} onClick={goToHome} alt="NEXT 로고" />

      <S.NavLinkWrapper>
        {Links.map(({ name, path }) => (
          <S.StyledNav isWhite={pathname === URLS.HOME} to={path} key={name}>
            {name}
          </S.StyledNav>
        ))}
      </S.NavLinkWrapper>
    </S.NavBarContainer>
  );
};

export default NavBar;