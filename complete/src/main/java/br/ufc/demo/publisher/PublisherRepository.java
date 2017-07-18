package br.ufc.demo.publisher;

public interface PublisherRepository {
	
public Iterable<Publisher> findAll();
	
	public Publisher get(Integer id);
	
	public void save(Publisher publisher);
	
	public void delete(Integer id);
	
	public void update(Integer id, Publisher publisher);
	
}
