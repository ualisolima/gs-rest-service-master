package br.ufc.demo.pub;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface PubRepository extends JpaRepository<Pub, Integer>{
	
	List<Pub> findByTitle(@Param("title") String title);
	
}
