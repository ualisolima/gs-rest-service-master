package br.ufc.demo.publisher;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class InMemoryPublisherlisherRepository implements PublisherRepository{
	private static final List<Publisher> PUBS = new ArrayList<>();
	
	static {
		PUBS.addAll(Arrays.asList(
				new Publisher(1, "Abril", "SP"),
				new Publisher(2, "New York Times", "NY"),
				new Publisher(3,"The Guardian","London")
		));
	}

	@Override
	public Iterable<Publisher> findAll() {
		return Collections.unmodifiableList(PUBS);
	}

	@Override
	public Publisher get(Integer id) {
		for (Publisher p : PUBS) {
			if (p.getId().equals(id)) {
				return p;
			}
		}
		return null;
	}

	@Override
	public void save(Publisher pub) {
		if (!PUBS.contains(pub))
			PUBS.add(pub);
		return;
	}

	@Override
	public void delete(Integer id) {
		for (Iterator<Publisher> it = PUBS.iterator(); it.hasNext();) {
			Publisher p = it.next();
			if (p.getId().equals(id)) {
				PUBS.remove(p);
			}
		}

		return;
	}

	@Override
	public void update(Integer id, Publisher pub) {
		for (Publisher p : PUBS) {
			if (p.getId().equals(id)) {
				p.setId(id);
				p.setName(pub.getName());
				p.setLocation(pub.getLocation());
				return;
			}
		}

		return;
	}
}
