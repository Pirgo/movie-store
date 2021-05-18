## Zespół:

### Kamil Kurowski
### Mateusz Pieróg



# Projekt z baz danych


## Ogólny zarys

* Mamy w planie stworzyć serwis z filmami
* coś w stylu “Filmweb”
* Mamy bazę filmów, osób kina oraz serwisów streamingowych
* Każdy użytkownik ma swoją bibliotekę, może oceniać filmy, oznaczać jako obejrzane itp
* Dane filmów najprawdopodobniej pochodzące z zewnętrznego API
* Sprawdzać informacje na temat filmów, osób itp.
* Wyszukiwanie w zależności od filtrów (typ, rok, reżyser, itp)


## Technologie

* Dokumentowa baza danych: MongoDB
* Frontend: React.js
* Node.js
* Express.js


## Dokumentacja

[Link do google docs](https://docs.google.com/document/d/1IDP3PLPie59oKxTlVEqZKJXBfDBSobYQ6-YQ4tkv9cs/edit)


## Struktura bazy danych (v.0.2 stan z dnia 18.05.2021)
### Wypełniona przykładowymi danymi

### Tabela przetrzymująca dane Użytkownika

```
"User":
{
    "_id": "60a3bcf3f5cf182ca3bd05f1",
    "email": "asdfg@gmail.com",
    "password": "<ENCODED PASSWORD",
    "firstName": "Jan Julian",
    "lastName": "Kowalski",
    "createdAt": "2021-05-18T13:11:15.924Z",
    "updatedAt": "2021-05-18T13:11:15.924Z",
    "__v": 0
    "library": {
    "toWatch": [
    {
      "movieID": "235235",
      "title": "to watch 1"
    }
  ],
  "favourites": [
    {
      "movieID": "235235",
      "title": "fav 1"
    }
  ],
  "seen": [
    {
      "movieID": "235235",
      "title": "seen 1"
    },
    {
      "movieID": "3453",
      "title": "seen 2",
      "rate": 4
    },
    {
      "movieID": "326",
      "title": "seen 3",
      "rate": 2
    }
  ]
}
    
```

### Tabela przetrzymująca dane dotyczace filmu

```
"Movie":
 {
    "_id": "60a3ab2ebf147569236e2566",
    "title": "First Movie",
    "date": "2020-02-11T00:00:00.000Z",
    "runtime": 3,
    "rate": {
      "sum": 0,
      "amount": 0
    },
    "genre": [
      "Action"
    ],
    "plot": "Movie about this project",
    "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFlOaeron7sa8fd9Xlv5GZZ3JOkd6piSEMpw&usqp=CAU",
    "directors": [
      {
        "directorName": "Dir Name",
        "directorID": "456456"
      }
    ],
    "writers": [
      {
        "writerName": "Writ Name",
        "writerID": "456456"
      },
      {
        "writerName": "Writ name 2",
        "writerID": "456456"
      }
    ],
    "actors": [
      {
        "actorName": "Anonymous actor"
      }
    ],
    "platforms": [
      {
        "name": "Netflix",
        "URL": "random"
      }
    ],
    "createdAt": "2021-05-18T11:55:26.019Z",
    "updatedAt": "2021-05-18T11:55:26.019Z",
    "__v": 0
  }


```
### Tabela przetrzymująca dane dotyczace osób związanych z filmami

```
"People":
 {
     "_id": "60a3c0b793fa99389e728b5b",
    "firstName": "Jan Julian",
    "lastName": "Kowalski",
    "born": "2001-05-01T00:00:00.000Z",
    "__v": 0
    "functions": {
      "director": [
        {
          "title": "gsfhsgd",
          "movieID": "235235"
        }
      ],
      "actor": [
        {
          "title": "fav1",
          "movieID": "235235"
        }
      ],
      "writer": [
        {
          "title": "seem1",
          "movieID": "235235"
        },
        {
          "title": "seen2",
          "movieID": "3453"
        },
        {
          "title": "seen3",
          "movieID": "326"
        }
      ]
    },
    "photo": "https://image.slidesharecdn.com/funnycatvideosdownload-150901043709-lva1-app6892/95/funny-cat-videos-download-1-638.jpg?cb=1441082273",
 }

```


