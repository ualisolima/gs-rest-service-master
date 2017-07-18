package br.ufc.demo.author;


public interface AuthorRepository {

	public Iterable<Author> findAll();
	
	public Author get(Integer id);
	
	public void save(Author author);
	
	public void delete(Integer id);
	
	public void update(Integer id, Author author);
	
}
