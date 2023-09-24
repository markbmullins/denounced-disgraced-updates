import React,{useState} from 'react'
import { Filter as FilterIcon } from 'lucide-react'
import Filter from './Filter'
import styled from 'styled-components'
import { FilterValueTypes } from "../../../pages/store";

const _MobileFilter = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    gap:5px;
    align-items: center;
    @media screen and (min-width:768px) {
        display: none;
        
    }
`

const MobileFilterContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  padding:5px;
  top:0;

  width:  50%;
  height: 100vh !important;
  background-color: #1a1a1a;
  z-index: 50;
  right: ${(props) => (props.isOpen ? "-20px" : "-100%")};
  @media screen and (min-width: 768px) {
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
          <MobileFilterContainer isOpen={isOpen} >
              <Filter filterValues={filterValues}
                  
          filterParams={filterParams}
                  setFilterParams={setFilterParams} />
              
          </MobileFilterContainer>
    </_MobileFilter>
  )
}

export default MobileFilter