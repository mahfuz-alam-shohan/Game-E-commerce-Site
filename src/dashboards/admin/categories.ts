// src/dashboards/admin/categories.ts
import type { Category } from "../../services/categoryService";

export function adminCategoryListView(categories: Category[]) {
  const rows =
    categories.length === 0
      ? `<tr><td colspan="4" class="muted" style="padding:10px 8px;font-size:13px;">No categories created yet.</td></tr>`
      : categories
          .map(
            c => `
        <tr>
          <td style="padding:6px 8px;font-size:13px;">${c.name}</td>
          <td style="padding:6px 8px;font-size:13px;color:var(--color-muted);">${c.slug}</td>
          <td style="padding:6px 8px;font-size:13px;">${
            c.is_active ? "Active" : "Hidden"
          }</td>
          <td style="padding:6px 8px;font-size:13px;color:var(--color-muted);">${c.sort_order}</td>
        </tr>
      `
          )
          .join("");

  return `
    <div class="page">
      <h1 class="page-title">Categories</h1>
      <p class="page-subtitle">
        Group your products by type, game, or any structure you prefer.
      </p>

      <div class="stack-md">
        <section class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <div>
              <h2 class="card-title">All categories</h2>
              <p class="card-subtitle">
                Use categories to organise optimizers, skins, passes and more.
              </p>
            </div>
            <a href="/admin/categories/new" class="btn">Add category</a>
          </div>

          <div style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;">
              <thead>
                <tr>
                  <th style="text-align:left;padding:6px 8px;font-size:12px;color:var(--color-muted);font-weight:500;border-bottom:1px solid var(--color-border);">Name</th>
                  <th style="text-align:left;padding:6px 8px;font-size:12px;color:var(--color-muted);font-weight:500;border-bottom:1px solid var(--color-border);">Slug</th>
                  <th style="text-align:left;padding:6px 8px;font-size:12px;color:var(--color-muted);font-weight:500;border-bottom:1px solid var(--color-border);">Status</th>
                  <th style="text-align:left;padding:6px 8px;font-size:12px;color:var(--color-muted);font-weight:500;border-bottom:1px solid var(--color-border);">Order</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  `;
}

export function adminCategoryNewView(errorMessage?: string) {
  const errorBlock = errorMessage
    ? `<p class="card-subtitle" style="color:#f97373;margin-bottom:10px;">${errorMessage}</p>`
    : `<p class="card-subtitle">
         Keep names short and clear. Slug is used in URLs (you can leave it empty and we will generate it).
       </p>`;

  return `
    <div class="page">
      <h1 class="page-title">New category</h1>
      <p class="page-subtitle">
        Create a category to group related products.
      </p>

      <div class="card">
        <h2 class="card-title">Category details</h2>
        ${errorBlock}
        <form method="POST" action="/admin/categories/new">
          <div class="field">
            <label for="name">Name</label>
            <input id="name" name="name" required placeholder="e.g. Optimizers" />
          </div>
          <div class="field">
            <label for="slug">
              Slug
              <small>(optional – used in URLs, e.g. <code>optimizers</code>)</small>
            </label>
            <input id="slug" name="slug" placeholder="leave empty to auto-generate" />
          </div>
          <div class="field">
            <label for="description">
              Description
              <small>(optional – for admin context, not required)</small>
            </label>
            <input id="description" name="description" placeholder="Short internal description" />
          </div>
          <div class="field">
            <label for="sort_order">
              Sort order
              <small>(lower appears first; default 0)</small>
            </label>
            <input id="sort_order" name="sort_order" type="number" value="0" />
          </div>
          <div class="field">
            <label for="is_active">
              Status
              <small>(active categories can be shown on the storefront)</small>
            </label>
            <select id="is_active" name="is_active" style="padding:7px 9px;border-radius:6px;border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);">
              <option value="1" selected>Active</option>
              <option value="0">Hidden</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn">Create category</button>
            <a href="/admin/categories" class="btn-secondary btn">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  `;
}
