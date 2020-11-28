package com.tialys.edito.repository;

import com.tialys.edito.domain.Theme;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Theme entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {

    @Query("select theme from Theme theme where theme.user.login = ?#{principal.username}")
    List<Theme> findByUserIsCurrentUser();
}
