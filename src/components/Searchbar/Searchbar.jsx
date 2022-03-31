import { useState } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import s from './Searchbar.module.css';

function Searchbar({onSubmit}
){
  const [title, setTitle] = useState('')

  const handleTitleChange = e => {
    setTitle( e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
  

    if (title.trim() === '') {
      Notify.warning('введите данные в поисковую строку');

      return;
    }
   onSubmit(title);

   setTitle('');
  };

 
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleSubmit}>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={title}
            onChange={handleTitleChange}
          />

          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  
}

export default Searchbar;

