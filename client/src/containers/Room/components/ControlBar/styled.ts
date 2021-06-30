import styled from "styled-components";

export const ControlBarWrapper = styled.div<{ showControlBar: boolean }>`
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 8%;
  left: 0;
  display: flex;
  justify-content: center;
  visibility: ${(props) => (props.showControlBar ? "unset" : "hidden")};
  opacity: ${(props) => (props.showControlBar ? 1 : 0)};
  transition: all 300ms;
`;

export const ControlBarContainer = styled.div`
  height: 100%;
  display: flex;
  transition: all 300ms;
`;

export const ControlBarButton = styled.button<{
  active: boolean;
  call?: boolean;
}>`
  margin: 0 0.5rem;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  position: relative;
  cursor: pointer;
  transition: all 300ms;
  background-color: ${(props) =>
    props.active ? "#fff" : "rgba(0, 0, 0, 0.5)"};
  color: ${(props) => (props.active ? "#000" : "#fff")};
  ${(props) => (props.call ? "background: red;" : "")}
`;

export const NotificationAmount = styled.div`
  position: absolute;
  top: -3px;
  right: -3px;
  min-width: 20px;
  height: 20px;
  padding: 0 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 10px;
  background-color: red;
`;
