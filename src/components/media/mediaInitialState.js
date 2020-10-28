const initialState = [
  
  {"mediaID":1,"media":"Paperback","electronic":false,"sortID":1,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"mediaID":2,"media":"Hardcover","electronic":false,"sortID":2,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"mediaID":3,"media":"Kindle","electronic":true,"sortID":3,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"mediaID":4,"media":"Audiobook","electronic":true,"sortID":4,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"mediaID":5,"media":"Audiobook CD","electronic":false,"sortID":5,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":6,"media":"Film VHS","electronic":false,"sortID":6,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":7,"media":"Film DVD","electronic":false,"sortID":7,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":8,"media":"Film HD DVD","electronic":false,"sortID":8,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":9,"media":"Film Blu-ray","electronic":false,"sortID":9,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":10,"media":"Film 4K","electronic":false,"sortID":10,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":11,"media":"Film Multi-Format","electronic":false,"sortID":11,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":12,"media":"Film Download","electronic":true,"sortID":12,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":13,"media":"Television VHS","electronic":false,"sortID":13,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":14,"media":"Television DVD","electronic":false,"sortID":14,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":15,"media":"Television HD DVD","electronic":false,"sortID":15,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":16,"media":"Television Blu-ray","electronic":false,"sortID":16,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":17,"media":"Television 4K","electronic":false,"sortID":17,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":18,"media":"Television Multi-Format","electronic":false,"sortID":18,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":19,"media":"Television Download","electronic":true,"sortID":19,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":20,"media":"Documentaries VHS","electronic":false,"sortID":20,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":21,"media":"Documentaries DVD","electronic":false,"sortID":21,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":22,"media":"Documentaries HD DVD","electronic":false,"sortID":22,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":23,"media":"Documentaries Blu-ray","electronic":false,"sortID":23,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":24,"media":"Documentaries 4K","electronic":false,"sortID":24,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":25,"media":"Documentaries Multi-Format","electronic":false,"sortID":25,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":26,"media":"Documentaries Download","electronic":true,"sortID":26,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"mediaID":27,"media":"Music CD","electronic":false,"sortID":27,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":28,"media":"Music MP3","electronic":true,"sortID":28,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"mediaID":29,"media":"Music Streaming","electronic":true,"sortID":29,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"mediaID":30,"media":"Video Game","electronic":false,"sortID":30,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":31,"media":"Game","electronic":false,"sortID":31,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"mediaID":32,"media":"Audiobook Cassette","electronic":false,"sortID":32,"active":true,"createdAt":"2020-10-19T18:42:36.573Z","updatedAt":"2020-10-19T18:42:36.573Z"}

];

export default initialState;