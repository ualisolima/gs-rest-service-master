package br.ufc.demo.pub;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class InMemoryPubRepository implements PubRepository {
	
	private static final List<Pub> PUBS = new ArrayList<>();
	
	static {
		PUBS.addAll(Arrays.asList(
				new Pub(1, "1995", "SVM",1,1),
				new Pub(2, "2005", "IA",2,2),
				new Pub(3,"2015","word2vec",3,3)
		));
	}

	@Override
	public Iterable<Pub> findAll() {
		return Collections.unmodifiableList(PUBS);
	}

	@Override
	public Pub get(Integer id) {
		for (Pub p : PUBS) {
			if (p.getId().equals(id)) {
				return p;
			}
		}
		return null;
	}

	@Override
	public void save(Pub pub) {
		if (!PUBS.contains(pub))
			PUBS.add(pub);
		return;
	}

	@Override
	public void delete(Integer id) {
		for (Iterator<Pub> it = PUBS.iterator(); it.hasNext();) {
			Pub p = it.next();
			if (p.getId().equals(id)) {
				PUBS.remove(p);
			}
		}

		return;
	}

	@Override
	public void update(Integer id, Pub pub) {
		for (Pub p : PUBS) {
			if (p.getId().equals(id)) {
				p.setId(id);
				p.setYear(pub.getYear());
				p.setTitle(pub.getTitle());
				return;
			}
		}

		return;
	}

	@Override
	public Iterable<Pub> findAllAuthor(Integer authorId) {
		List<Pub> pubs = new ArrayList<>();
		for (Pub p : PUBS)
			if (p.getAuthorId().equals(authorId))
				pubs.add(p);
		return Collections.unmodifiableList(pubs);
	}

	@Override
	public Pub getPubAuthor(Integer pubId, Integer AuthorId) {
		Pub p = get(pubId);
		if (p.getAuthorId().equals(AuthorId))
			return p;
		return null;
	}

	@Override
	public Iterable<Pub> findAllPublisher(Integer publisherId) {
		List<Pub> pubs = new ArrayList<>();
		for (Pub p : PUBS)
			if (p.getAuthorId().equals(publisherId))
				pubs.add(p);
		return Collections.unmodifiableList(pubs);
	}

	@Override
	public Pub getPubPublisher(Integer pubId, Integer publisherId) {
		Pub p = get(pubId);
		if (p.getPublisherId().equals(publisherId))
			return p;
		return null;
	}

}
