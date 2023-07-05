/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../../../config/api/firebaseConfig";

const UseCategoryController = () => {
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const location = useLocation();
  const { category } = useParams();

  const getStore = () => {
    let allStoresByCategory = [];
    db.collection("store")
      .where("category", "==", category)
      .get()
      .then((res) => {
        res.docs.forEach((doc) => {
          let dataWay = doc._delegate._document.data.value.mapValue.fields;
          allStoresByCategory.push({
            id: doc.id,
            name: dataWay.name.stringValue,
            category: dataWay.category.stringValue,
            url: dataWay.urlName.stringValue,
            img: dataWay.img?.stringValue,
          });
        });
        setStores(allStoresByCategory);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getStore();
  }, [location]);

  return {
    States: {
      loading,
      stores,
      category,
    },
  };
};

export default UseCategoryController;
