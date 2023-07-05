import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../../config/api/firebaseConfig";

const UseHomeController = () => {
  const [loading, setLoading] = useState(false);
  const [storeList, setStoreList] = useState([]);

  const getStores = () => {
    setLoading(true);
    db.collection("/store")
      .get()
      .then((res) => {
        if (res.size > 0) {
          setStoreList([]);
          res.docs.forEach((doc) => {
            let way = doc._delegate._document.data.value.mapValue.fields;
            let store = {
              id: doc.id,
              name: way.name.stringValue,
              category: way.category.stringValue,
              url: way.urlName.stringValue,
              img: way.img?.stringValue,
            };
            setStoreList((prevStore) => [...prevStore, store]);
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getStores();
  }, []);

  return {
    States: {
      loading,
      storeList,
    },
  };
};

export default UseHomeController;
