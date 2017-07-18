package br.ufc.demo.author;


import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.demo.pub.Pub;
import br.ufc.demo.pub.PubRepository;
@RestController
@RequestMapping("/authors")
public class AuthorController {
	
	@Autowired
	AuthorRepository repository;
	
	@Autowired
	PubRepository pubRepository;
	
	@GetMapping
	public ResponseEntity<Iterable<Author>> queryAllAuthors (){ 
		return ResponseEntity.ok(repository.findAll());
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Author> getAuthor(@PathVariable("id") Integer id) {

		Author author = repository.get(id);
		if (author == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

		return ResponseEntity.ok(author);
	}
	
	@GetMapping("/{id}/pubs")
	public ResponseEntity<Iterable<Pub>> getAuthorPubs(@PathVariable("id") Integer id) {
		return ResponseEntity.ok(pubRepository.findAllAuthor(id));
	}
	
	@GetMapping("/{id}/pubs/{pubid}")
	public ResponseEntity<Pub> getAuthorPub(@PathVariable("id") Integer id, @PathVariable("pubid") Integer pubId) {

		Pub p = pubRepository.getPubAuthor(pubId, id);
		if (p == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

		return ResponseEntity.ok(p);
	}
	
	@PostMapping
	public ResponseEntity<Void> createAuthor(@RequestBody Author author) throws MalformedURLException, URISyntaxException {
		repository.save(author);
		URL createURL = new URL("http://localhost:8080/authors");
		return ResponseEntity.created(createURL.toURI()).build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteAuthor(@PathVariable("id") Integer id) throws URISyntaxException, MalformedURLException {
		repository.delete(id);
		URL createURL = new URL("http://localhost:8080/authors");
		return ResponseEntity.created(createURL.toURI()).build();

	}

	@PutMapping("/{id}")
	public ResponseEntity<Void> updateAuthor(@PathVariable("id") Integer id, @RequestBody Author author) throws MalformedURLException, URISyntaxException {

		repository.update(id, author);
		URL createURL = new URL("http://localhost:8080/authors/"+id.toString());
		return ResponseEntity.created(createURL.toURI()).build();
	}
	
}
