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
- **Comment**: Manged

![models](https://user-images.githubusercontent.com/81626271/188463228-d8eb95e4-fa17-4aa3-9708-2036a547af82.png)
 User-Answers





## Endpunkte:


USER / PHOTOS / COMMENTS


### POST /user/signUp

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
  id:"userAddedddeww"
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
  username:'Test Test'
}
```

### GET /user

gibt die actuellen User zurück

Response:

```javaScript
{
  id:"userAddedddeww"
  email:"tester@test.com",
  uploadetPhotos:[ObjectID,...,...],
  likedPhotos:[]
}
```

### POST /photos


Body:

```javaScript
{
  user:"ObjectId",
  imgFile: 'blablablaaaa'
  category:'Nature',
  comments:[ObjectId,...,...]
}
```

Response:

```javaScript
{
  id:"photos1Qqqqsfhkksfr"
  user:"userAddedddeww",
  category:'Nature',
  photoFile: 'blablablaaaa'
}
```

### GET / photos


liefert eine Liste aller meine Upgeloadet PHOTOS zurück

body:

```JavaScript
[
{
  id:"photos1Qqqqsfhkksfr"
  user: ObjectID
  comments:[ObjectIDs]
```

### GET /photos/[:id]

liefert uns eine einzelne Photo zurück

Response:

```JavaScript

{
  id:"photos1Qqqqsfhkksfr"
  user: ObjectID
}

```

### POST /comments

erstellt eine COMMENT für ein PHOTO

Body:

```javaScript
{
  user:"ObjectID",
  photoFile:ObjectID,
  content:"Das ist eine schönes Bild....."
}
```

Response:

```javaScript
{
  id:"Comment1233324nqqwwwseww"
  content:"Das ist eine schönes Bild.........",
  user:"ObjectID",
  photoFile:"ObjectID"
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
