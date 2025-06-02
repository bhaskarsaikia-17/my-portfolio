import React from 'react';
import styled from 'styled-components';
import Aurora from './Aurora';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  background-color: #000;
`;

const AuroraBackground: React.FC = () => {
  return (
    <BackgroundContainer>
      <Aurora 
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} 
        amplitude={1.0} 
        blend={0.5}
        speed={0.5}
      />
    </BackgroundContainer>
  );
};

export default AuroraBackground; 