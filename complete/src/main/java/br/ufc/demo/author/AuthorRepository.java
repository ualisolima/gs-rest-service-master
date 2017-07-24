package br.ufc.demo.author;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface AuthorRepository extends JpaRepository<Author, Integer>{

	
}
