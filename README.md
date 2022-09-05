# backend 
# Up & Download Images APP

## Features

### REQUIRED-Features

- **Register**: Der User kann sich einem Account erstellen und damit sich anmelden kann.

- **Login**: Der User kann über eine Anmelde-Maske sich in seinen Account einloggen

- **Logout**: Der User kann sich aus seinem Account ausloggen.

- **FOTOS**: Es können Fotos in der User-Account-Seite gespeichert werden. Diese sind die Fotos , die er schön upgeloadet hat in eine Liste (unter my Pictures ) und fotos die ihm vom anderen gefallen haben in eine Liste (unter Likes) 
- alle werden auf dem Server mit mongoDB gespeichert.
  Der User kann in jedes Foto mehr details über diese Foto ansehen (username , user ProfileImage ,Likes Icon,  download Icons , comments)
  Der User kann reactiv mit der Fotos sein , Aber kann  Like, Comment, Button oder Download funktionalität nur funktioniert  wenn User einen Account hat bzw. hat sich erfolgreich angemeldet.



- **Foto hochladen**: Der User kann über ein Formdata Titel und Description (und Kategorie , location) angeben. Diese Foto wird in der Datenbank gespeichert werden und in der My Picture Collection  und in der Home-Seite mit alle anderen Fotos gezeigt werden.
- **Foto herrunterladen**: Der User kann fotos vom anderen UsersCtegorien Fotos herrunterladen . Diese Question wird in der Datenbank gespeichert
- ** Likes Collection erstellen**: Gelikte Fotos zur Likes Collection in meinem Accout hinzugefügt werden.

### OPTIONAL-Features - |

- **Account-Update**: Der User kann seine persönlichen Daten ändern (Fullname & Username & ProfileImage &  About me ).
- **Kategorie-Filter**: Es gibt eine feste Liste von Kategorien. Der User kann diese Kategorien als Filter für die Fotos-Categories verwenden. Die Kategorie wird bei dem Hochladen einem Foto defeniert. 


### OPTIONAL-Features - ||

- **ProfileImage**: Der User kann beim Erstellen des Accounts einen ProfileImage hochladen. dieser wird auf allen Fotos bei Home-Seite und My Account -Seite vor dem username angezeigt werden (profileImage nicht required)

- **User-Picturs-List**: Der User kann im Account-Bereich eine Liste seiner eigenen Pictures sehen. (unter collections : Picture)


- **User-Likes-List**: Der User kann im Account-Bereich auch eine Liste seiner likes Pictures sehen. (unter collections : Likes)

- **Such-Funktion**: Das Foto kann nach Titel oder Category gefunden werden.

## Models

- **User**: Manged User-Daten
- **Foto** : Manged User-foto
- **Comment**: Manged User-Answers

![Model-Relations](images/Model-Relation.png)

## Endpunkte:

### POST /user/register

erstellt einen neuen User und loggt ihn ein

Body:

```javaScript
{
  email:"tester@test.com",
  password:"123456789",
}
```

Response:

```javaScript
{
  id:"addedddeww"
  email:"tester@test.com"
}
```

### POST /user/login

logged den User ein

Body:

```javaScript
{
  email:"tester@test.com",
  password:"123456789",
}
```

Response:

```javaScript
{
  id:"addedddeww"
  email:"tester@test.com",
  name:"Testrt Test",
}
```

### GET /user

gibt die actuellen User zurück

Response:

```javaScript
{
  id:"addedddeww"
  email:"tester@test.com",
}
```

### POST /photos


Body:

```javaScript
{
  title:"?",
  description:"....",
  category:''
}
```

Response:

```javaScript
{
  id:"qqqqsfhkksfr"
  title:"?",
  description:"....",
  user:"addedddeww",
  likes:[],
  pictures:[]
  category:''
}
```

### GET /questions

liefert eine Liste aller Questions zurück

shape:

```JavaScript
[
{
  id:"qqqqsfhkksfr"
  title: 'was kann XZ tun',
  description: ".....",
  user:{
    email:'tester@test.com',
    name:'Tester Test'
  }
  answers:[
    {
      description:"...."
    }
  ]
}
]
```

### GET /questions/[:id]

liefert uns eine einzelne Question zurück

Response:

```JavaScript

{
  id:"qqqqsfhkksfr"
  title: 'was kann XZ tun?',
  description: ".....",
  user:{
    email:'tester@test.com',
    name:'Tester Test'
  }
}

```

### POST /answers

erstellt eine Antwort für eine Question

Body:

```javaScript
{
  question:"qqqqsfhkksfr",
  description:"....",
}
```

Response:

```javaScript
{
  id:"annqqwwwseww"
  description:"....",
  user:"addedddeww",
  question:"qqqqsfhkksfr"
}
```

### POST /user/logout

der usertoken cookie wird gelöscht . der token wird aus der Datenbank entfert.

Body:

```javaScript
{}
```

Response:

```javaScript
true
```
