import React,{useState,useEffect,useRef} from 'react'
import { Filter as FilterIcon,X } from 'lucide-react'
import Filter from './Filter'
import styled from 'styled-components'
import { FilterValueTypes } from "../../../pages/store";

const _MobileFilter = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    gap:5px;
    align-items: center;
    @media screen and (min-width:950px) {
        display: none;
        
    }
`

const MobileFilterContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  padding:10px;
  top:0;

  width:  100%;
  height: 100vh !important;
  background-color: #1a1a1a;
  z-index: 150;
  right: ${({isOpen}) => (isOpen ? "-20px" : "-120%")};
  @media screen and (min-width: 950px) {
    display: none;
  }
  transition: all 0.3s ease; /* Add a transition for width change */
`;


const MobileFilter = ({ filterValues,filterParams,setFilterParams }: { filterValues: FilterValueTypes | null,filterParams:any,setFilterParams: (val:any) => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleFilter = () => {
        setIsOpen(!isOpen)
  }


  



  return (
      <_MobileFilter>
          <FilterIcon onClick={toggleFilter} />
      <p onClick={toggleFilter} >Filter</p>
        <MobileFilterContainer isOpen={isOpen}  >
          <X style={{position:"absolute",right:'40px',top:'10px;'}}  onClick={() => {setIsOpen(false)}}/>
              <Filter filterValues={filterValues}
                  
          filterParams={filterParams}
                  setFilterParams={setFilterParams} />
              
        </MobileFilterContainer>
    </_MobileFilter>
  )
}

export default MobileFilter