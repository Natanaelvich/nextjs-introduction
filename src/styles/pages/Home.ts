import styled from 'styled-components';

export const Container = styled.div`
display : flex;
align-items : center;
justify-content :center;
height : 100vh;
width : 100vw;

flex-direction : column;
`
export const Title = styled.h1`
  font-size : 45px;
  color : #7159c1;
  font-weight : bold;
`;
export const List = styled.ul`
  background : #1D2125;
  margin-top : 20px;
  padding : 20px;
  border-radius : 12px;
  box-shadow: 0px 0px 17px -5px rgba(0,0,0,0.75);

  li{
      font-size : 26px;
      color : #fff;
      margin-bottom : 12px;
  }
`;

