import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Header = styled.header`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-variant-numeric: tabular-nums;
  & small {
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    font-size: 0.8rem;
  }
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`

export const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  background-color: #000;
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: #fff;
  font-size: 5rem;
`

export const TabularNums = styled.p`
  font-variant-numeric: tabular-nums;
`
