import React,{useEffect,useState} from 'react'
import {Nav} from 'react-bootstrap'
import './style.css'
import {Container, Row, Col,Table,Button,InputGroup,FormControl} from "react-bootstrap";
import {Link} from 'react-router-dom'

const getData = async () =>{
    //product.json in public folder
    return fetch('product.json',{headers : {'Content-Type': 'application/json','Accept': 'application/json'}})
            .then(data=> data.json())
} 

const FilterBar = ({category,price,priceChange,manufacturer,onBoxSelect,applyBtn,resetFilter}) => {
    
    return(
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky"></div>
            <Nav.Item>
                <form>
                <h3>Filter</h3>
                <p>Category</p>
                <ul style={{listStyle:"none",border:"1px solid #eee",margin:"1em"}}>
                    {
                        category.map(item => <li><input onClick={onBoxSelect} id={'cat_' + item} data-target="category" value={item} type="checkbox"/> <label htmlFor={'cat_' + item}>{item}</label></li>)
                    }
                </ul>
                <p>Price</p>
                <div style={{padding:"1em"}}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                        Lowest Price
                    </InputGroup.Text>
                    <FormControl id="min_price" aria-describedby="basic-addon3" onChange={priceChange} value={price.min_price} data-target="price" type="number"/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                        Highest Price
                    </InputGroup.Text>
                    <FormControl id="max_price" aria-describedby="basic-addon3"  onChange={priceChange} value={price.max_price}  data-target="price" type="number" />
                </InputGroup>
                </div>
                <p>Manufacturer</p>
                <ul style={{listStyle:"none",border:"1px solid #eee",margin:"1em"}}>
                    {
                        manufacturer.map(item => <li><input type="checkbox" onClick={onBoxSelect}  id={'man_' + item} data-target="manufacturer" value={item}/> <label htmlFor={'man_' + item}>{item}</label></li>)
                    }
                </ul>
                <hr/>
                <p style={{textAlign:"center"}}><Button onClick={applyBtn}>Apply</Button> <Button type="reset" onClick={resetFilter}>Reset</Button></p>
                </form>
            </Nav.Item>
        </Nav>
    )
}

export default function Task5() {
    const initialSettings = {
        category : [],
        price : {min_price:"",max_price:""},
        manufacturer : [],
    }
    const [ row, setRow ] = useState([])
    const [ orig, setOrig ] = useState([])
    const [ totalCost, setTotalCost ] = useState()
    const [ averagePrice, setAveragePrice ] = useState()
    const [ totalQuantity, setTotalQuantity ] = useState()
    const [ cheapest, setCheapest ] = useState({})
    const [ expensive, setExpensive ] = useState({})
    const [ sortItem, setSortItem ] = useState({
        id : true,
        category : true,
        product : true,
        manufacturer : true,
        price: true,
        production_date: true
    })
    const [ navDisplay, setNavDisplay ] = useState(false)
    const [ category, setCategory] = useState([])
    const [ manufacturer, setManufacturer] = useState([])
    const [ filterSettings , setFilterSettings] = useState(initialSettings)

    useEffect(() => {
        let mounted = true;
        getData()
        .then(items => {
        if(mounted) {
            setRow(items)
            setOrig(items)
            setTotalQuantity(parseInt(row.length))
            setTotalCost(items.reduce((a,b) => a + parseFloat(b.price),0))
            setAveragePrice(parseFloat(totalCost) / parseFloat(totalQuantity))
            setCheapest(items.sort((a,b) => parseFloat(a.price) - parseFloat(b.price))[0])
            setExpensive(items.sort((a,b) => parseFloat(b.price) - parseFloat(a.price))[0])
            setCategory([...new Set(items.map(item => item.category))])
            setManufacturer([...new Set(items.map(item => item.manufacturer))])
            setRow(row.sort((a,b) => a.id - b.id)) // re arrange row
        }
        })
    return () => mounted = false;
    }, [totalCost,totalQuantity])

    const itemSort = ( header ) =>{
        var result
        switch(header){
            case "category":
            case "manufacturer":
            case "product":
                if(sortItem[header]){
                    result = [...row.sort((a,b) => a[header].localeCompare(b[header]))]
                }else{
                    result = [...row.sort((a,b) => b[header].localeCompare(a[header]))]
                }
            
            break
            case "price":
            case "id":
                if(sortItem[header]){
                    result = [...row.sort((a,b) => parseFloat(a[header]) - parseFloat(b[header]))]
                }else{
                    result = [...row.sort((a,b) => parseFloat(b[header]) - parseFloat(a[header]))]
                }
            break
            case "production_date":
                if(sortItem[header]){
                    result = [...row.sort((a,b) => new Date(a.production_date) - new Date(b.production_date))]
                }else{
                    result = [...row.sort((a,b) =>  new Date(b.production_date) - new Date(a.production_date))]
                }
            break
        }
        setSortItem({...sortItem, [header]: !sortItem[header]})
        setRow(result)
    }

    const showFilter = () =>{
        setNavDisplay(display => !display)
    }

    const boxSelect = (evt) =>{
        if(evt.target.checked){
            setFilterSettings({...filterSettings, [evt.target.dataset.target]: [...filterSettings[evt.target.dataset.target],evt.target.value]})
        }else{
            setFilterSettings({...filterSettings,[evt.target.dataset.target]: [...filterSettings[evt.target.dataset.target].filter((x) => x !== evt.target.value)]})
        }
    }

    const updatePrice = (evt) =>{
        if(evt.target.value === "") return
        setFilterSettings({...filterSettings, price: {...filterSettings.price, [evt.target.id] : evt.target.value }})
    }

    const getFilters = () =>{
        setNavDisplay(display => !display)
        let new_row = orig
        if(filterSettings.category.length > 0 && filterSettings.manufacturer.length > 0){
            let temp_row1 = orig.filter(item => filterSettings.category.includes(item.category))
            let temp_row2 = orig.filter(item => filterSettings.manufacturer.includes(item.manufacturer))
            new_row = [...new Set(temp_row1.concat(temp_row2))];
        }
        if(filterSettings.category.length > 0 && filterSettings.manufacturer.length === 0){
            new_row = new_row.filter(item => filterSettings.category.includes(item.category))
        }
        if(filterSettings.manufacturer.length > 0 && filterSettings.category.length === 0){
            new_row = new_row.filter(item => filterSettings.manufacturer.includes(item.manufacturer))
        }
        if(filterSettings.price.min_price !== "" && filterSettings.price.max_price !== ""  ){
            new_row = new_row.filter(item => item.price >= parseFloat(filterSettings.price.min_price) && item.price <= parseFloat(filterSettings.price.max_price) )
        }
       setRow(new_row)
    }
    const resetFilter = () =>{
        setFilterSettings(initialSettings)
        setNavDisplay(display => !display)
        setRow(orig)
    }
  return (
    <div>
        <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper" style={navDisplay ? {display:"block",transform:"translateX(10%)"}:{display:"none",transform:"translateX(-100%)"}}>      
                        <FilterBar category={category} resetFilter={resetFilter} applyBtn={getFilters} priceChange={updatePrice} manufacturer={manufacturer} onBoxSelect={boxSelect} price={filterSettings.price}/>
                    </Col>
                    <Col id="page-content-wrapper">
                    <h4>Task 5</h4>
                    <p><Link to="/">Go back</Link></p>
                    <Button className="btn btn-secondary mb-2" onClick={showFilter}> Options </Button>
                    <div className="product-data">
                    <Row>
                        <Col xs={6}>Total Quantity</Col>
                        <Col>{totalQuantity}</Col>
                    </Row>
                    <Row>
                        <Col xs={6}>Total Cost</Col>
                        <Col>${totalCost}</Col>
                    </Row>
                    <Row>
                        <Col xs={6}>Average Price</Col>
                        <Col>${parseFloat(averagePrice).toFixed(2)}</Col>
                    </Row>
                    <Row>
                        <Col xs={6}>Most Expensive Product</Col>
                        <Col>{expensive.hasOwnProperty("category") ? expensive.category.toUpperCase() : ""} ${expensive.price}</Col>
                    </Row>
                    <Row>
                        <Col xs={6}>Cheapest Product</Col>
                        <Col>{cheapest.hasOwnProperty("category") ? cheapest.category.toUpperCase() : ""} ${cheapest.price}</Col>
                    </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th onClick={() => itemSort("id")}>#</th>
                            <th onClick={() => itemSort("product")}>Product</th>
                            <th onClick={() => itemSort("category")}>Category</th>
                            <th onClick={() => itemSort("manufacturer")}>Manufacturer</th>
                            <th onClick={() => itemSort("price")}>Price</th>
                            <th onClick={() => itemSort("production_date")}>Production Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {row.map((item,i) => {
                            return(
                                <tr key={i}>
                                    <td>{item.id + 1}</td>
                                    <td>{item.product}</td>
                                    <td>{item.category}</td>
                                    <td>{item.manufacturer}</td>
                                    <td>${item.price}</td>
                                    <td>{new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.production_date))}</td>
                                </tr>
                            )
                            })}
                        </tbody>
                    </Table>
                    </Col> 
                </Row>

            </Container>
        
       
    </div>
  )
}
