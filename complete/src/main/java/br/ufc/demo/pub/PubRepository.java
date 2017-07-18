package br.ufc.demo.pub;

public interface PubRepository {
	
	public Iterable<Pub> findAll();
	
	public Iterable<Pub> findAllAuthor(Integer authorId);
	
	public Iterable<Pub> findAllPublisher(Integer publisherId);
	
	public Pub get(Integer id);
	
	public Pub getPubAuthor(Integer pubId, Integer AuthorId);
	
	public Pub getPubPublisher(Integer pubId, Integer publisherId);
	
	public void save(Pub pub);
	
	public void delete(Integer id);
	
	public void update(Integer id, Pub pub);
	
	
}
