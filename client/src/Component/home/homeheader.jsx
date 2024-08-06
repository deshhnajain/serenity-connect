import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  background: #edc7b7;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

const MenuItem = styled.li`
  cursor: pointer;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Nav>
        <Logo>Sernity-Connect</Logo>
        <Menu>
          <MenuItem>Home</MenuItem>
          <MenuItem>About</MenuItem>
          <MenuItem>Services</MenuItem>
          <MenuItem>search bar</MenuItem>
        </Menu>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
