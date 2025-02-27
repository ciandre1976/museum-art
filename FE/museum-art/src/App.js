import "./App.css";
import { useEffect, useState } from "react";
import { Container, Typography, Box, Input } from "@mui/material/";
import { Paper } from "@mui/material/";
import { TreeComponent } from "./components/TreeComponent";
import ImageComponent from "./components/ImageComponent";
import FormComponent from "./components/FormComponent";
import HeaderComponent from "./components/HeaderComponent";



function App() {
  const [radio, setRadio] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [itemImage, setItemImage] = useState({});
  const [itemDefined, setItemDefined] = useState(false);
  const [collectionData, setCollectionData] = useState({});
  const [dataUs, setUsData] = useState();
  const [euData, setEuData] = useState();

  useEffect(() => {
    const getCollectionById = async () => {
      const res = await fetch("http://localhost:5000/api/data/colection/");
      const result = await res.json();
      setCollectionData(result);
      return result;
    };
    getCollectionById();
  }, []);

  useEffect(() => {
    const getCollection = async () => {
      const res = await fetch("http://localhost:5000/api/data/tree/20");
      const result = await res.json();
      setEuData(result);
      return result;
    };
    getCollection();
  }, []);

  useEffect(() => {
    const getCollection = async () => {
      const res = await fetch("http://localhost:5000/api/data/tree/10");
      const result = await res.json();
      setUsData(result);
      return result;
    };
    getCollection();
  }, []);

  let collectionImage = (itemImage) => {
    return (
      <Box ml={5} width="100%">
        <ImageComponent item={itemImage} />
      </Box>
    );
  };

  const handleShowImage = (id) => {
    setShow(true);
    setItemDefined(true);
    const ID = parseInt(id);
    collectionData?.collection.filter((i) => {
      if (ID == i.id) {
        setItemImage(i);
        return {};
      }
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    const { collection } = collectionData;

    const filteredData = () => {
      if (radio === "all") {
        return collection.filter((col) =>
          col?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (radio === "potery" || radio === "painting") {
        return collection.filter((col) => {
          return (
            col?.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            col?.type === radio
          );
        });
      }
    };
    const data = filteredData();
    setShow(false);
    setSearchData(data);
    setSearchTerm("");
  };

  return (
    <>
      <Container h={100}>
        <HeaderComponent />
        <FormComponent
          radio={radio}
          setRadio={setRadio}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleForm={handleForm}
        />
        <Box m={1} style={{ display: "flex" }}>
          {dataUs?.map((element) => {
            return (
              <TreeComponent
                element={element}
                handleShowImage={handleShowImage}
              />
            );
          })}
          {euData?.map((element) => {
            return (
              <TreeComponent
                element={element}
                handleShowImage={handleShowImage}
              />
            );
          })}

          {show ? (
            <Box width={"60%"} marginLeft={1}>
              {itemDefined ? (
                collectionImage(itemImage)
              ) : (
                <Typography>No item selected!</Typography>
              )}
            </Box>
          ) : (
            <Box ml={5} width={"60%"}>
              {searchData?.map((item) => (
                <ImageComponent item={item} />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}
export default App;
