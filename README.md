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
* Frontend: Angular
* Node.js
* Express.js


## Dokumentacja

[Link do google docs](https://docs.google.com/document/d/1IDP3PLPie59oKxTlVEqZKJXBfDBSobYQ6-YQ4tkv9cs/edit)


## Struktura bazy danych (v.0.1 stan z dnia 04.05.2021)

### Tabela przetrzymująca dane Użytkownika

```
"User":
{
    "email": "",
    "password": "",
    "fisrtName": "",
    "lastName": "",
    "contact": {}
}
    
```

### Tabela przetrzymująca dane dotyczace filmu

```
"Movie":
{
    "title": "",
    "genre": [],
    "date": "",
    "runtime": "",
    "plot": "",
    "rate": {
        "sum": "",
        "amount": ""
    },
    "directors": [
        { 
            "directorID":""
        }
    ],
    "writers": [
        { 
            "writerID":""
        }
    ],
    "actors": [
        { 
            "actorID":""
        }
    ],
    "cover": "",
    "platforms": [

    ],
    "platforms": [
      {
          "name": "",
          "URL": ""
      }
    ]

}

```
### Tabela przetrzymująca dane dotyczace osób związanych z filmami

```
"People":
{
    "fisrtName": "",
    "lastName": "",
    "born": "",
    "photo": "",
    "functions": {
        "director": [
            id_filmu, tytuł
        ],
        "writer": [

        ],
        "actor": [

        ]
    }
}

```

### Tabela przetrzymująca biblioteke użytkownika
```
"Library":
{
    "userID": "",
    "toWatch": [

    ],
    "favourites": [

    ],
    "seen": [
        {
            "movieID": "",
            "rate": ""
        }
    ]
}
```
