package br.ufc.demo.publisher;

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
@RequestMapping("/publishers")
public class PublisherController {
	
	@Autowired
	PublisherRepository repository;
	
	@Autowired
	PubRepository pubRepository;
	
	@GetMapping
	public ResponseEntity<Iterable<Publisher>> queryAllPubs (){ 
		return ResponseEntity.ok(repository.findAll());
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Publisher> getPub(@PathVariable("id") Integer id) {

		Publisher pub = repository.get(id);
		if (pub == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

		return ResponseEntity.ok(pub);
	}
	
	@GetMapping("/{id}/pubs")
	public ResponseEntity<Iterable<Pub>> getPublisherPubs(@PathVariable("id") Integer id) {
		return ResponseEntity.ok(pubRepository.findAllPublisher(id));
	}
	
	@GetMapping("/{id}/pubs/{pubid}")
	public ResponseEntity<Pub> getPublisherPub(@PathVariable("id") Integer id, @PathVariable("pubid") Integer pubId) {

		Pub p = pubRepository.getPubPublisher(pubId, id);
		if (p == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

		return ResponseEntity.ok(p);
	}
	
	@PostMapping
	public ResponseEntity<Void> createPub(@RequestBody Publisher pub) throws MalformedURLException, URISyntaxException {
		repository.save(pub);
		URL createURL = new URL("http://localhost:8080/pubs");
		return ResponseEntity.created(createURL.toURI()).build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePub(@PathVariable("id") Integer id) throws URISyntaxException, MalformedURLException {
		repository.delete(id);
		URL createURL = new URL("http://localhost:8080/pubs");
		return ResponseEntity.created(createURL.toURI()).build();

	}

	@PutMapping("/{id}")
	public ResponseEntity<Void> updatePub(@PathVariable("id") Integer id, @RequestBody Publisher pub) throws MalformedURLException, URISyntaxException {

		repository.update(id, pub);
		URL createURL = new URL("http://localhost:8080/pubs/"+id.toString());
		return ResponseEntity.created(createURL.toURI()).build();
	}

}
