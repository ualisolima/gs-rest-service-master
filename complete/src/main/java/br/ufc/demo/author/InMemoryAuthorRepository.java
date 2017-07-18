package br.ufc.demo.author;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;


@Component
public class InMemoryAuthorRepository implements AuthorRepository{
	
	private static final List<Author> AUTHORS = new ArrayList<>();
	
	static {
		AUTHORS.addAll(Arrays.asList(
				new Author(1, "Glauco", "Aquino"),
				new Author(2, "Felipe", "Pinheiro"),
				new Author(3,"Machado","de Assis")
		));
	}
	
	@Override
	public Iterable<Author> findAll() {
		return Collections.unmodifiableList(AUTHORS);
	}

	public Author get(Integer id) {

		for (Author a : AUTHORS) {
			if (a.getId().equals(id)) {
				return a;
			}
		}
		return null;
	}

	public void save(Author author) {
		if (!AUTHORS.contains(author))
			AUTHORS.add(author);
		return;
	}

	public void delete(Integer id) {
		for (Iterator<Author> it = AUTHORS.iterator(); it.hasNext();) {
			Author a = it.next();
			if (a.getId().equals(id)) {
				AUTHORS.remove(a);
			}
		}

		return;
	}

	public void update(Integer id, Author author) {

		for (Author a : AUTHORS) {
			if (a.getId().equals(id)) {
				a.setId(id);
				a.setFirstName(author.getFirstName());
				a.setLastName(author.getLastName());
				return;
			}
		}

		return;
	}

}
