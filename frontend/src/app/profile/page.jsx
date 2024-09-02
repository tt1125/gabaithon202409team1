"use client";
import React, { useState } from 'react';
import { Select, MenuItem, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel, Button } from '@mui/material'; // Material-UIコンポーネントをインポート
export default function Profile() {
  const categories = [
    { id: 1, name: "中華" },
    { id: 2, name: "和食" },
    { id: 3, name: "洋食" },
    { id: 4, name: "韓国料理" },
    { id: 5, name: "イタリアン" },
    { id: 6, name: "フレンチ" },
    { id: 7, name: "インド料理" },
    { id: 8, name: "焼肉" },
    { id: 9, name: "居酒屋" },
  ];
  const handleClick = () => {
    alert("OK button clicked!");
  };
    const [ageGroup, setAgeGroup]= useState('');
    const [ selectedCategories, setselectedCategories] = useState('');
    const handleAgeGroupChange = (event) => {
        setAgeGroup(event.target.value);
    };
    const handleButtonClick = (categoryId) => {
        console.log(selectedCategories)
        setselectedCategories(prevState =>
            prevState.includes(categoryId)
            ? prevState.filter(id => id !== categoryId)
            : [...prevState, categoryId]
        );
    };
    const styles = {
        main: {
          padding: "20px",
          fontFamily: "'Arial', sans-serif",
          backgroundColor: "#F9F9F9",
          borderRadius: "8px",
          maxWidth: "600px",
          margin: "0 auto",
        },
        header: {
          textAlign: "center",
          color: "#333",
        },
        subHeader: {
          color: "#555",
        },
        section: {
          marginBottom: "20px",
        },
        label: {
          display: "block",
          marginBottom: "10px",
          color: "#333",
        },
        input: {
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        },
        select: {
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        },
        container: {
          textAlign: "center",
        },
        buttonGroup: {
          justifyContent: "center",
          display: 'flex',
          flexWrap: "wrap",
          gap: "10px",
        },
        button: {
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        },
        icon: {
          width: "24px",
          height: "24px",
        },
      };
  return (
      <main style={styles.main}>
        <h1 style={styles.header}>Profile</h1>
        <div style={styles.section}>
          <h2 style={styles.subHeader}>名前</h2>
          <input type="text" name="name" style={styles.input} />
        </div>
        <div style={styles.section}>
  <h2 style={styles.subHeader}>性別</h2>
  <FormControl component="fieldset">
    <FormLabel component="legend">性別を選択</FormLabel>
    <RadioGroup name="bg" style={styles.radioGroup}>
      <FormControlLabel value="boy" control={<Radio />} label="男性" />
      <FormControlLabel value="girl" control={<Radio />} label="女性" />
      <FormControlLabel value="none" control={<Radio />} label="未回答" />
    </RadioGroup>
  </FormControl>
</div>
<div style={styles.section}>
        <h2 style={styles.subHeader}>年代</h2>
        <FormControl fullWidth>
          <Select
            value={ageGroup}
            onChange={handleAgeGroupChange}
            style={styles.select}
          >
            <MenuItem value="option0">無回答</MenuItem>
            <MenuItem value="option1">0~10歳</MenuItem>
            <MenuItem value="option2">11~20歳</MenuItem>
            <MenuItem value="option3">21~30歳</MenuItem>
            <MenuItem value="option4">31~40歳</MenuItem>
            <MenuItem value="option5">41~50歳</MenuItem>
            <MenuItem value="option6">51~60歳</MenuItem>
          </Select>
        </FormControl>
      </div>
        <div className="container">
          <h2 style={styles.subHeader}>好きな食べ物のジャンルは何ですか？</h2>
          <div className="button-group" style={styles.buttonGroup}>
            {categories.map((category) => (
              <div className="category" key={category.id}>
               <Button
                key={category.id}
                    onClick={() => handleButtonClick(category.id)}
                    style={{
                        backgroundColor: selectedCategories.includes(category.id)  ? 'lightblue' : 'white',
                        border: '1px solid #ccc',
                        padding: '10px',
                        margin: '5px',
                        cursor: 'pointer',
                    }}
                >
                    {category.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div>
        <center><h2>完了ボタン</h2></center>
        <center><Button variant="contained" color="primary" onClick={handleClick}>
          OK
        </Button>
        </center>
      </div>
      </main>
  );
}









