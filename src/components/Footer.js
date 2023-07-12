import styled from "styled-components"

export const FooterContainer = styled.footer`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height:58px;
font-size:12px;
background-color:white;
color:#888888;
`

function Footer() {
    return (
        <FooterContainer>
            <div>개인정보 처리방침 | 이용 약관</div>
            <div>All rights reserved @ Codestates</div>
        </FooterContainer>
    );
  }
  
  export default Footer;
  