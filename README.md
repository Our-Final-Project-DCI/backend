# backend

# Up & Download PHOTOS App

## Features

### REQUIRED-Features

- **Register**: Der User kann sich einem Account erstellen und damit sich anmelden kann.

- **Login**: Der User kann über eine Anmelde-Maske sich in seinen Account einloggen

- **Logout**: Der User kann sich aus seinem Account ausloggen.

- **Foto hochladen**: Der User darf Photo hochladen wenn User einen Account hat und er ist eingeloggt .
  über ein Formdata werden Fotos hochgeladen . Dafür sind photo-File und category Felder (required) um Bilder hochzuladen..
  Titel , Description und location sind nicht required beim Photo-Upload .Dieses Foto wird in der Datenbank gespeichert werden.

alle hochgeladene Photos werden in der My Photos Collection in Account- Seite und und auch in der Gallery-Seite unter einer Category und kann auch im Home-seite mit random bilder von anderen Users gezeigt werden.

- **Foto herrunterladen**: Der User kann fotos vom anderen Fotos herrunterladen .

- **Foto kommentieren**: Der User kann seine Kommentare an fotos mit anderen mitteilen (comment schreiben) .

- **FOTO**
  Der User kann sich mehr details über jedes Foto informieren wen man darauf klickt.
  auf Bilder steht (username , user ProfileImage ) und Like , download , comments funktionalität
  , die Der User erlaubt mit Foto reactiv zu sein : Like, Comment, Download Aber all das nur funktioniert wenn User einen Account bzw. er erfolgreich eingelogt ist.

### OPTIONAL-Features - |

- **Account-Update**: Der User kann seine persönlichen Daten ändern und erwiteren (Fullname & Username & ProfileImage & About me ).

### OPTIONAL-Features - ||

- **Avatar**: Der User kann beim Erstellen des Accounts einen ProfileImage hochladen. dieser wird auf allen Fotos bei Home-Seite und My Account-Seite vor dem username angezeigt werden (aber profileImage nicht required)

- **User-Photos-List**: Der User kann im Account-Bereich eine Liste seiner eigenen hochgeladene Pictures sehen. ( collection : My Photos)

- **User-Likes-List**: Der User kann im Account-Bereich auch eine Liste seiner gelikes Pictures sehen. ( collection : Likes)

- **Such-Funktion**: Das Foto könnte nach Titel oder Category gesucht und gefunden werden.

## Models

- **User**: Manged User-Daten
- **Foto** : Manged User-foto
- **Comment**: Manged
![PHTOTORAM-Model-mockup](https://user-images.githubusercontent.com/81626271/189150270-81efa674-11d4-4212-a21f-de21ea172c36.png)

## endpunkte:

USER / PHOTOS / COMMENTS

### POST /user/signUp

erstellt einen neuen User und loggt ihn ein

Body:

```javaScript
{
  email:"hello@world.com",
  password:"123456789",
  username:"Hey Hallo",
  fullname:''
}
```

Response:

```javaScript
{
  _id:"userId234570UU88",
  email:"tester@test.com",
  username:"Hey Hallo",
}
```

### POST /user/login

logged den User ein

Body:

```javaScript
{
  email:"hello@world.com",
  password:"123456789",
}
```

Response:

```javaScript
{
  _id:"userId234570UU88",
  email:"hello@world.com",
  username:'Test Test'
}
```

### GET /user

gibt die actuellen User zurück

Response:

```javaScript
{
  _id:"userId234570UU88"
  email:"tester@test.com",
  uploadetPhotos:[ObjectID,...,...],
  likedPhotos:[]
}
```

### PATCH /user

ermöglicht es user-daten zu updaten. Body wird als FormData definiert (avatar hochladen)

Body:
```javaScript
{
  name: "Hey Hello",
  avatar: "my-avatar.jpg",
  username:"hallo WORLD"
}
```

Response:
```javaScript

{
  _id: "userId234570UU88",
  email: "tester@test.com",
  name: "Hey Hello",
  avatar: "data:base64"
}
```


### POST /photos

ladet eine neue PHOTO hoch

Body:

```javaScript
{
  category:'Nature',
  photoFile: 'blabla/blaaa',
  comments:[ObjectIds,...,...]
}
```

Response:

```javaScript
{
  _id:"photoId234570UU88"
  user:"userId234570UU88",
  category:'Nature',
  photoFile: 'blabla/blaaa'
}
```

### GET / photos

liefert eine Liste aller meine Upgeloadet PHOTOS zurück

body:

```JavaScript
[
{
  _id:"photos1Qqqqsfhkksfr"
  user: "ObjectID"
  comments:[ObjectIDs]
  },]
```

### GET /photos/[:id]

liefert uns eine einzelne Photo zurück

Response:

```JavaScript

{
  _id:"photos1Qqqqsfhkksfr"
  user: ObjectID
}

```

### POST /comments

erstellt eine COMMENT für ein PHOTO

Body:

```javaScript
{
  photoFile: ObjectID,
  content:"Das ist ein schönes Bild....."
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

### Get /comments??

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
