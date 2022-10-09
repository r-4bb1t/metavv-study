import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useCallback, useEffect, useState } from 'react';
import { BookType, MealType } from '../constants/type';
import { Book } from "../Components/book";
import { Meal } from "../Components/meal";

const Home: NextPage = () => {
  
  const [data, setData] = useState({ books: [], meals: [] } as {
    books: BookType[];
    meals: MealType[];
  });

  const [name, setName] = useState('');
  const [type, setType] = useState("book");
  const [price, setPrice] = useState(0);
  const [authorOrRestaurant, setAuthorOrRestaurant] = useState('');

  const fetchData = useCallback(async () => {
    const result = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/`)
    ).json();
    setData(result);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {

    const body =
      type === "book"
        ? {
            type,
            name,
            price,
            author: authorOrRestaurant,
          }
        : {
            type,
            name,
            price,
            restaurant: authorOrRestaurant,
          };
    const result = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/new`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    console.log(result);
  };

  
  return (

    <div className={styles.container}>
      <div className={styles.bookList}>
        <div className={styles.book}>📘 Book-List 📒</div>
        <div className={styles.wrapper}>
          {data.books.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </div>
      <br/>
      <div className={styles.mealList}>
        <div className={styles.meal}>🍲 Meal-List 🍜</div>
        <div className={styles.wrapper}>
          {data.meals.map((meal) => (
            <Meal meal={meal} key={meal.id} />
          ))}
        </div>
      </div>
      
      <div className={styles.box}>
        <h4 style={{marginTop: '5px', marginBottom: '5px'}}>🤔 추가하기 ➰</h4>
        <br/>
        <div>종류<select onChange={(e)=>{setType(e.target.value);
        }}>
          <option value="book">책</option>  
          <option value="meal">음식</option>  
        </select></div>
        <div>제목<input placeholder='제목' onChange={(e)=>{setName(e.target.value);}}></input></div>
        <div>가격<input placeholder='가격' type="number" onChange={(e)=>setPrice(parseInt(e.target.value))}></input></div>
        
        {type === "book" ? (
          <label className={styles.label}>
            작가
            <input
              placeholder="작가"
              onChange={(e) => {
                setAuthorOrRestaurant(e.target.value);
              }}
            />
          </label>
        ) : (
          <label className={styles.label}>
            식당
            <input
              placeholder="식당"
              onChange={(e) => {
                setAuthorOrRestaurant(e.target.value);
              }}
            />
          </label>
        )}
        <br/>
        <button onClick={()=> handleSubmit()}>추가하기</button>
      </div>
   </div>

  )
}

export default Home
