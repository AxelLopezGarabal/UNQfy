
class Controller{
	contructor(){
		this._unqfy;
	}

	getUNQfy(){ return this._unqfy; }

	setUNQfy(unqfy){ this._unqfy = unqfy; }

	addArtist(args){
		if(args.length > 2 || args.length < 2 ){
			throw "ERROR : should pass two args as follow => Artist_name, country"
		}
		else{
			this._unqfy.addArtist({'name': args[0], 'country': args[1]});
		}
	}

	addAlbum(args){
		if(args.length > 3 || args.length < 3 ){
			throw "ERROR : should pass three args as follow => Artist_name, Album_name, Album_year"
		}
		else{
			this._unqfy.addAlbum((this._unqfy.getArtistByName(args[0]).id) , 
				                 ({"name": args[1], "year": args[2], "tracks": []}) )
		}
	}

	addTrack(args){
		if(args.length > 4 || args.length < 4 ){
			throw "ERROR : should pass four args as follow => Album_name, Track_name, Track_duration, Track_genres"
		}
		else{
			this._unqfy.addTrack((this._unqfy.searchByName(args[0]).albums[0].id) , 
				                 ({'name':args[1], 'duration':args[2], 'genres':args[3] }) );
		}
	}

	/* DISCLAIMER ==>> no elimina los tracks del artista de todas las playlists*/
	removeArtist(args){
		if(args.length > 1 || args.length < 1 ){
			throw "ERROR : should pass one args as follow => Artist_name"
		}
		else{
			this._unqfy.removeArtist(args[0]);
		}
	}
}

module.exports = {Controller};